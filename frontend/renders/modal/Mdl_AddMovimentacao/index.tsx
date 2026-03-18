import React, { useState, useEffect } from 'react';
import './styles.css';
import type { NewTransactionData, Transaction, TransactionType } from '../../../global/types';
import { PREDEFINED_CATEGORIES } from '../../../global/categories'; // <-- IMPORTAÇÃO ATUALIZADA

// Ícones
const IconClose = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;

// A lista de categorias foi movida para 'global/constants.ts'

interface Mdl_AddMovimentacaoProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: (data: NewTransactionData) => void;
  onUpdateTransaction: (transaction: Transaction) => void;
  transactionToEdit?: Transaction | null;
}

const Mdl_AddMovimentacao: React.FC<Mdl_AddMovimentacaoProps> = ({ isOpen, onClose, onAddTransaction, onUpdateTransaction, transactionToEdit }) => {
  // ... (o restante do código do componente permanece o mesmo) ...
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState<TransactionType>('expense');

  const isEditMode = !!transactionToEdit;

  useEffect(() => {
    if (isOpen && isEditMode) {
      setText(transactionToEdit.text);
      setAmount(String(transactionToEdit.amount));
      setCategory(transactionToEdit.category);
      setType(transactionToEdit.type);
    } else {
      setText('');
      setAmount('');
      setCategory('');
      setType('expense');
    }
  }, [transactionToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text || !amount || !category) {
      console.error('Preencha todos os campos');
      return;
    }

    const transactionData = {
      text,
      amount: parseFloat(amount),
      category,
      type,
    };

    if (isEditMode) {
      onUpdateTransaction({
        ...transactionToEdit,
        ...transactionData,
      });
    } else {
      onAddTransaction(transactionData);
    }

    onClose();
  };

  return (
    <div className="modal-overlay open" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEditMode ? 'Editar Movimentação' : 'Adicionar Movimentação'}</h2>
          <button onClick={onClose} className="close-btn"><IconClose /></button>
        </div>

        <form onSubmit={handleSubmit} className="add-transaction-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="text">Descrição</label>
              <input id="text" type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Ex: Compras no mercado" required />
            </div>
            <div className="form-group">
              <label htmlFor="category">Categoria</label>
              <select id="category" value={category} onChange={e => setCategory(e.target.value)} required>
                <option value="" disabled>Selecione uma categoria</option>
                {PREDEFINED_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="amount">Valor</label>
              <input id="amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" required />
            </div>
            <div className="form-group">
              <label htmlFor="type">Tipo</label>
              <select id="type" value={type} onChange={e => setType(e.target.value as TransactionType)}>
                <option value="expense">Despesa</option>
                <option value="income">Receita</option>
              </select>
            </div>
          </div>
          <button type="submit" className="add-btn">
            {isEditMode ? 'Salvar Alterações' : 'Adicionar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Mdl_AddMovimentacao;