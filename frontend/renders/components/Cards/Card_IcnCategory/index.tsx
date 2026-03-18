import React from 'react';

const IconFood = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3z" /><path d="M17.5 14.5c1.25 0 2.5-1 2.5-2.5s-1.25-2.5-2.5-2.5-2.5 1-2.5 2.5 1.25 2.5 2.5 2.5z" /><path d="M2 14v5h20v-5" /></svg>;
const IconHome = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>;
const IconTransport = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>;
const IconHealth = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>;
const IconLeisure = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m16 6 4 14" /><path d="M12 6v14" /><path d="M8 8v12" /><path d="M4 4v16" /></svg>;
const IconPet = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 14.5l-3.5-3.5a5 5 0 1 1 7 0L12 14.5z" /><path d="M12 21a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" /></svg>;
const IconSalary = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>;
const IconInvestments = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></svg>;
const IconEducation = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
const IconShopping = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>;
const IconDefault = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /></svg>;


// Mapeamento das categorias para os componentes de ícone
const categoryIconMap: { [key: string]: React.FC } = {
    'Alimentação': IconFood,
    'Moradia': IconHome,
    'Transporte': IconTransport,
    'Saúde': IconHealth,
    'Lazer': IconLeisure,
    'Pet': IconPet,
    'Salário': IconSalary,
    'Investimentos': IconInvestments,
    'Educação': IconEducation,
    'Compras': IconShopping,
    'Outros': IconDefault,
};

// Componente helper que renderiza o ícone correto
export const Card_IcnCategory: React.FC<{ category: string; className?: string }> = ({ category, className }) => {
    const IconComponent = categoryIconMap[category] || IconDefault;
    return <IconComponent />;
};