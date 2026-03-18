import React, { useState, useMemo } from 'react';
import './styles.css';
import Mdl_AddMovimentacao from '../../modal/Mdl_AddMovimentacao';
import type { NewTransactionData, Transaction } from '../../../global/types';
import { PREDEFINED_CATEGORIES } from '../../../global/categories';
import { Card_IcnCategory } from './../../components/Cards/Card_IcnCategory/index';

// Ícones para as ações
const IconEdit = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>;
const IconTrash = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>;

interface FragFluxoProps {
    transactions: Transaction[];
    onAddTransaction: (data: NewTransactionData) => void;
    onUpdateTransaction: (transaction: Transaction) => void;
    onDeleteTransaction: (id: string) => void;
}

const formatCurrency = (value: number): string => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const FragFluxo: React.FC<FragFluxoProps> = ({ transactions, onAddTransaction, onUpdateTransaction, onDeleteTransaction }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
    const [selectedCategory, setSelectedCategory] = useState('all'); // Estado para o filtro

    const openModal = (transaction?: Transaction) => {
        setEditingTransaction(transaction || null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingTransaction(null);
    };

    const filteredTransactions = useMemo(() => {
        if (selectedCategory === 'all') {
            return transactions;
        }
        return transactions.filter(t => t.category === selectedCategory);
    }, [transactions, selectedCategory]);

    return (
        <>
            <div className="app-container">
                <header className="fluxo-header">
                    <div className="header-content">
                        <h1>Fluxo de Caixa</h1>
                        <p>Gerencie todas as suas entradas e saídas.</p>
                    </div>
                    <button className="btn-primary add-transaction-btn" onClick={() => openModal()}>
                        Adicionar Transação
                    </button>
                </header>

                {/* NOVO: Filtro de categoria com botões (chips) */}
                <div className="category-filter-chips">
                    <button
                        className={`chip ${selectedCategory === 'all' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('all')}
                    >
                        Todas
                    </button>
                    {PREDEFINED_CATEGORIES.map((cat: string) => (
                        <button
                            key={cat}
                            className={`chip ${selectedCategory === cat ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>


                <div className="card">
                    <table className="fluxo-table">
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Descrição</th>
                                <th>Categoria</th>
                                <th style={{ textAlign: "right" }}>Valor</th>
                                <th style={{ textAlign: "center" }}>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.map(t => (
                                <tr key={t.id}>
                                    <td>{new Date(t.date).toLocaleDateString('pt-BR')}</td>
                                    <td>{t.text}</td>
                                    <td>
                                        <div className="category-cell">
                                            <Card_IcnCategory category={t.category} />
                                            <span className="category-badge">{t.category}</span>
                                        </div>
                                    </td>
                                    <td style={{ textAlign: "right" }}>
                                        <span className={`amount ${t.type}`}>
                                            {t.type === 'expense' ? '-' : '+'} {formatCurrency(t.amount)}
                                        </span>
                                    </td>
                                    <td className="actions-cell">
                                        <button className="action-btn" title="Editar" onClick={() => openModal(t)}>
                                            <IconEdit />
                                        </button>
                                        <button className="action-btn" title="Excluir" onClick={() => onDeleteTransaction(t.id)}>
                                            <IconTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredTransactions.length === 0 && (
                        <p className="empty-state">
                            {selectedCategory === 'all'
                                ? "Nenhuma transação encontrada."
                                : `Nenhuma transação encontrada para a categoria "${selectedCategory}".`}
                        </p>
                    )}
                </div>
            </div>

            <Mdl_AddMovimentacao
                isOpen={isModalOpen}
                onClose={closeModal}
                onAddTransaction={onAddTransaction}
                onUpdateTransaction={onUpdateTransaction}
                transactionToEdit={editingTransaction}
            />
        </>
    );
};

export default FragFluxo;