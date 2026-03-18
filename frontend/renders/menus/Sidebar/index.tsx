import React from 'react';
import './styles.css';
import type { Page } from '../../../global/types';

// Ícones (poderiam ser importados de um arquivo de ícones)
const IconLayoutDashboard = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>;
const IconChartBar = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><path d="m18 9-5 5-4-4-3 3"/></svg>;
const IconSettings = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2.4l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l-.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2.4l.15.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>;
const IconRepeat = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>;


interface SidebarProps {
    currentPage: Page;
    onNavigate: (page: Page) => void;
    isExpanded: boolean;
    setIsExpanded: (isExpanded: boolean) => void;
}


const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate, isExpanded, setIsExpanded }) => {
    return (
        <aside 
            className={`sidebar ${isExpanded ? 'expanded' : ''}`}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            <div className="sidebar-header">Track Money</div>
            <nav className="sidebar-nav">
                <ul>
                    <li><a href="#" className={currentPage === 'home' ? 'active' : ''} onClick={() => onNavigate('home')}><IconLayoutDashboard /> <span className="nav-text">Dashboard</span></a></li>
                    <li><a href="#" className={currentPage === 'fluxo' ? 'active' : ''} onClick={() => onNavigate('fluxo')}><IconRepeat /> <span className="nav-text">Fluxo de Caixa</span></a></li>
                    <li><a href="#" className={currentPage === 'relatorio' ? 'active' : ''} onClick={() => onNavigate('relatorio')}><IconChartBar /> <span className="nav-text">Relatórios</span></a></li>
                    <li><a href="#" className={currentPage === 'config' ? 'active' : ''} onClick={() => onNavigate('config')}><IconSettings /> <span className="nav-text">Configurações</span></a></li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;