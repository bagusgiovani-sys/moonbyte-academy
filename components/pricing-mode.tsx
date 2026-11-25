'use client';
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteStyle } from './style-selector';

const PricingContext = createContext(false);
export const usePricingMode = () => useContext(PricingContext);

export function PricingProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => setMessage(''), 2200);
    return () => window.clearTimeout(timer);
  }, [message]);
  const command = useCallback((value: string) => {
    const normalized = value.trim().toLocaleLowerCase();
    if (normalized === 'expecto patronum') { setVisible(true); setMessage('Welcome, hackers!'); return true; }
    if (normalized === 'avada kedavra') { setVisible(false); setMessage('Back to a boring life.'); return true; }
    return false;
  }, []);
  return <PricingContext.Provider value={visible}><CommandContext.Provider value={command}>{children}<SecretSplash message={message} /></CommandContext.Provider></PricingContext.Provider>;
}
const CommandContext = createContext<(value: string) => boolean>(() => false);
export function SecretCommand() {
  const [value, setValue] = useState('');
  const command = useContext(CommandContext);
  return <div className="secret-command"><label htmlFor="moonbyte-command">MOONBYTE / COMMAND</label><input id="moonbyte-command" type="text" autoComplete="off" spellCheck={false} placeholder="Ketik di sini..." value={value} onChange={event => { const next = event.target.value; setValue(command(next) ? '' : next); }} /></div>;
}
function SecretSplash({ message }: { message: string }) {
  const style = useSiteStyle();
  return <AnimatePresence>{message && <motion.div key={message} className={`secret-splash secret-${style}`} role="status" initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: .3 }}><span>MOONBYTE / SYSTEM</span><strong>{message}</strong><i /></motion.div>}</AnimatePresence>;
}
