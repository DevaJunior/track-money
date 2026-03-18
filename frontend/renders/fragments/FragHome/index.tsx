import './styles.css';
import '../../../global/styles.css';
import React from 'react';

const IconLogo = () => <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.6667 11.6667L15.8333 15.8333M28.3333 28.3333L24.1667 24.1667M11.6667 28.3333L15.8333 24.1667M28.3333 11.6667L24.1667 15.8333M20 5C19.2433 5 18.4984 5.09333 17.7783 5.275C17.0583 5.45667 16.3733 5.72333 15.7333 6.06667C15.0933 6.41 14.5083 6.82333 13.9933 7.295C13.4783 7.76667 13.04 8.29167 12.6883 8.855C12.3367 9.41833 12.075 10.0167 11.9117 10.6417C11.7483 11.2667 11.6667 11.9133 11.6667 12.5717V27.4283C11.6667 28.0867 11.7483 28.7333 11.9117 29.3583C12.075 29.9833 12.3367 30.5817 12.6883 31.145C13.04 31.7083 13.4783 32.2333 13.9933 32.705C14.5083 33.1767 15.0933 33.59 15.7333 33.9333C16.3733 34.2767 17.0583 34.5433 17.7783 34.725C18.4984 34.9067 19.2433 35 20 35C22.25 35 24.4167 34.1167 26.005 32.5283C27.5933 30.94 28.4783 28.7733 28.4783 26.5217V13.4783C28.4783 11.2267 27.5933 9.06 26.005 7.47167C24.4167 5.88333 22.25 5 20 5Z" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IconChevronDown = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>;

// CSS específico do FragHome, se necessário
//import { LineChart } from '../../components/Graficos/LineChart';
import type { Transaction } from '../../../global/types';

interface FragHomeProps {
    total: number;
    expense: number;
    transactions: Transaction[];
    openModal: () => void;
}

const formatCurrency = (value: number): string => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};


const FragHome: React.FC<FragHomeProps> = ({ total, expense, transactions, openModal }) => {
    return (
        <div className="app-container">
            <header>
                <div className="top-bar">
                    <div className="balance-display">
                        <h3>Saldo Atual</h3>
                        <p>{formatCurrency(total)}</p>
                    </div>
                    <div className="expense-display">
                        <div>
                            <h3>Despesas</h3>
                            <p>{formatCurrency(expense)}</p>
                        </div>
                        <div className="expense-icon" onClick={openModal}>
                            <IconChevronDown />
                        </div>
                    </div>
                </div>
                <div className="center-header">
                    <div className="logo-container"><IconLogo /></div>
                    <h1>Track Money</h1>
                    <p>Bem-vindo de volta! Aqui está o resumo das suas finanças.</p>
                    <div className="suggestion-chips">
                        <button className="chip" onClick={openModal}>Adicionar Despesa</button>
                        <button className="chip" onClick={openModal}>Adicionar Receita</button>
                        <button className="chip">Ver Extrato Completo</button>
                        <button className="chip">Definir Orçamento</button>
                        <button className="chip">Exportar Relatório</button>
                    </div>
                </div>
            </header>

            {/* <div className="card-container">
                <div className="card">
                    <h2 className="card-title">Evolução do Saldo</h2>
                    <div className="chart-container">
                        <LineChart data={transactions} />
                    </div>
                </div>
            </div> */}
        </div>
    );
};
export default FragHome;