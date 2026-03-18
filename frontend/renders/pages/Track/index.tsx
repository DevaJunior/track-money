import React, { useState, useEffect, useMemo } from 'react';

// Estilos
import './styles.css';
import '../../../global/styles.css';

// Componentes e Fragmentos
//import FragConfig from './../../fragments/FragConfig';
//import FragRelatorio from './../../fragments/FragRelatorio';
import FragHome from './../../fragments/FragHome';
import Sidebar from './../../menus/Sidebar';
import Mdl_AddMovimentacao from './../../modal/Mdl_AddMovimentacao';
//import FragFluxo from '../../fragments/FragFluxo';

// Tipos
import type { NewTransactionData, Page, Transaction } from '../../../global/types';

const Track: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

    // Efeito para carregar transações do localStorage na inicialização
    useEffect(() => {
        const storedTransactions = localStorage.getItem('transactions_v8');
        if (storedTransactions) {
            setTransactions(JSON.parse(storedTransactions));
        } else {
            // Dados iniciais de exemplo se não houver nada salvo
            const today = new Date();
            setTransactions([
                { id: '1', text: 'Salário Mensal', amount: 5000, category: 'Salário', date: new Date(today.getFullYear(), today.getMonth(), 1).toISOString(), type: 'income' },
                { id: '2', text: 'Aluguel', amount: 1500, category: 'Moradia', date: new Date(today.getFullYear(), today.getMonth(), 5).toISOString(), type: 'expense' },
            ]);
        }
    }, []);

    // Efeito para salvar transações no localStorage sempre que forem alteradas
    useEffect(() => {
        localStorage.setItem('transactions_v8', JSON.stringify(transactions));
    }, [transactions]);

    // --- Funções de Manipulação de Dados ---
    const handleDeleteTransaction = (id: string) => {
        setTransactions(transactions.filter(t => t.id !== id));
    };

    const handleAddTransaction = (data: NewTransactionData) => {
        const newTransaction: Transaction = {
            ...data,
            id: crypto.randomUUID(),
            date: new Date().toISOString(),
        };
        setTransactions(prev => [newTransaction, ...prev]);
    };

    const handleUpdateTransaction = (updatedTransaction: Transaction) => {
        setTransactions(transactions.map(t => (t.id === updatedTransaction.id ? updatedTransaction : t)));
    };

    // Função para abrir o modal a partir de páginas que não têm controle próprio (ex: Home)
    const openTransactionModal = (transaction?: Transaction) => {
        setEditingTransaction(transaction || null);
        setIsModalOpen(true);
    };

    // --- Cálculos de Totais ---
    const { income, expense, total } = useMemo(() => {
        const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
        const expense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
        return { income, expense, total: income - expense };
    }, [transactions]);

    // --- Renderização Condicional da Página ---
    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <FragHome total={total} expense={expense} transactions={transactions} openModal={() => openTransactionModal()} />;

            /*case 'fluxo':
                return <FragFluxo
                    transactions={transactions}
                    onAddTransaction={handleAddTransaction}
                    onUpdateTransaction={handleUpdateTransaction}
                    onDeleteTransaction={handleDeleteTransaction}
                />;

            case 'relatorio':
                return <FragRelatorio transactions={transactions} />;

            case 'config':
                return <FragConfig />;*/

            default:
                return <FragHome total={total} expense={expense} transactions={transactions} openModal={() => openTransactionModal()} />;
        }
    };

    return (
        <div className={`page-container ${isSidebarExpanded ? 'sidebar-expanded' : ''}`}>
            <Sidebar
                currentPage={currentPage}
                onNavigate={setCurrentPage}
                isExpanded={isSidebarExpanded}
                setIsExpanded={setIsSidebarExpanded}
            />
            <main className="main-content">
                {renderPage()}
            </main>

            {/* O Modal principal, usado por páginas como a Home */}
            {isModalOpen && currentPage !== 'fluxo' && (
                <Mdl_AddMovimentacao
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setEditingTransaction(null);
                    }}
                    onAddTransaction={handleAddTransaction}
                    onUpdateTransaction={handleUpdateTransaction}
                    transactionToEdit={editingTransaction}
                />
            )}
        </div>
    );
};

export default Track;