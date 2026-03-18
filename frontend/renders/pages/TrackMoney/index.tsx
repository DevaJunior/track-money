import React, { useState, useEffect, useMemo } from 'react';

// --- INTERFACES E TIPOS ---
type TransactionType = 'income' | 'expense';

interface Transaction {
  id: string;
  text: string;
  amount: number;
  category: string;
  date: string;
  type: TransactionType;
}

// Omit para o formulário, já que 'id' e 'date' são gerados na submissão
type NewTransactionData = Omit<Transaction, 'id' | 'date'>;


// --- COMPONENTES DE ÍCONES (SVG) ---
const IconLogo = () => <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.6667 11.6667L15.8333 15.8333M28.3333 28.3333L24.1667 24.1667M11.6667 28.3333L15.8333 24.1667M28.3333 11.6667L24.1667 15.8333M20 5C19.2433 5 18.4984 5.09333 17.7783 5.275C17.0583 5.45667 16.3733 5.72333 15.7333 6.06667C15.0933 6.41 14.5083 6.82333 13.9933 7.295C13.4783 7.76667 13.04 8.29167 12.6883 8.855C12.3367 9.41833 12.075 10.0167 11.9117 10.6417C11.7483 11.2667 11.6667 11.9133 11.6667 12.5717V27.4283C11.6667 28.0867 11.7483 28.7333 11.9117 29.3583C12.075 29.9833 12.3367 30.5817 12.6883 31.145C13.04 31.7083 13.4783 32.2333 13.9933 32.705C14.5083 33.1767 15.0933 33.59 15.7333 33.9333C16.3733 34.2767 17.0583 34.5433 17.7783 34.725C18.4984 34.9067 19.2433 35 20 35C22.25 35 24.4167 34.1167 26.005 32.5283C27.5933 30.94 28.4783 28.7733 28.4783 26.5217V13.4783C28.4783 11.2267 27.5933 9.06 26.005 7.47167C24.4167 5.88333 22.25 5 20 5Z" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const IconChevronDown = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>;
const IconTrash = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>;
const IconLayoutDashboard = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg>;
const IconChartBar = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="m18 9-5 5-4-4-3 3" /></svg>;
const IconSettings = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2.4l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l-.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2.4l.15.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>;
const IconClose = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;


// --- COMPONENTE DE ESTILOS GLOBAIS ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    :root {
      --color-background: #f8fafc;
      --color-card: #ffffff;
      --color-text: #0f172a;
      --color-text-muted: #64748b;
      --color-primary: #4338ca;
      --color-green: #16a34a;
      --color-red: #dc2626;
      --color-border: #e2e8f0;
      --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
      --border-radius: 0.75rem;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Inter', sans-serif;
      background-color: var(--color-background);
      color: var(--color-text);
    }
    
    .page-container {
      display: flex;
      min-height: 100vh;
    }

    .sidebar {
      width: 88px;
      background-color: var(--color-card);
      border-right: 1px solid var(--color-border);
      padding: 2rem 1.5rem;
      display: flex;
      flex-direction: column;
      position: fixed;
      height: 100%;
      z-index: 10;
      transition: width 0.3s ease;
      overflow-x: hidden;
    }
    .sidebar:hover {
      width: 250px;
    }
    .sidebar-header { 
      margin-bottom: 2.5rem; 
      font-size: 1.5rem; 
      font-weight: 700; 
      color: var(--color-primary); 
      white-space: nowrap;
      opacity: 0;
      transition: opacity 0.2s ease;
    }
    .sidebar:hover .sidebar-header {
      opacity: 1;
      transition-delay: 0.1s;
    }
    .sidebar-nav ul { list-style: none; }
    .sidebar-nav li a {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      color: var(--color-text-muted);
      font-weight: 500;
      text-decoration: none;
      transition: all 0.2s;
      white-space: nowrap;
    }
    .sidebar .nav-text {
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s ease, visibility 0.2s ease;
    }
    .sidebar:hover .nav-text {
      opacity: 1;
      visibility: visible;
      transition-delay: 0.1s;
    }
    .sidebar-nav li a:hover { background-color: #f1f5f9; color: var(--color-text); }
    .sidebar-nav li a.active { background-color: #eef2ff; color: var(--color-primary); }

    .main-content {
      flex: 1;
      overflow-y: auto;
      margin-left: 88px;
      transition: margin-left 0.3s ease;
    }
    .sidebar:hover ~ .main-content {
      margin-left: 250px;
    }

    .app-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }

    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .balance-display { text-align: left; }
    .balance-display h3, .expense-display h3 {
      font-size: 0.875rem;
      color: var(--color-text-muted);
      font-weight: 500;
    }
    .balance-display p {
      font-size: 1.875rem;
      font-weight: 700;
      color: var(--color-primary);
    }

    .expense-display {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-align: right;
    }
    .expense-display p { font-size: 1.5rem; font-weight: 600; }
    .expense-icon {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: #fee2e2;
      color: var(--color-red);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    @keyframes jump {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
    }

    .expense-icon:hover {
        animation: jump 0.6s ease;
    }

    .center-header {
      text-align: center;
      margin-bottom: 2.5rem;
    }
    .center-header .logo-container { margin-bottom: 1rem; }
    .center-header h1 { 
      font-size: 1.875rem; 
      font-weight: 700; 
      color: var(--color-primary);
      margin-bottom: 0.25rem;
    }
    .center-header p { color: var(--color-text-muted); }

    .suggestion-chips {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.75rem;
      margin-top: 1.5rem;
    }
    .chip {
      background-color: var(--color-card);
      border: 1px solid var(--color-border);
      padding: 0.5rem 1rem;
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }
    .chip:hover {
      background-color: #f1f5f9;
      border-color: #cbd5e1;
    }
    
    .card {
        background-color: var(--color-card);
        border: 1px solid var(--color-border);
        border-radius: var(--border-radius);
        padding: 1.5rem;
        box-shadow: var(--shadow-md);
    }
    .card-title { font-size: 1.25rem; font-weight: 600; margin-bottom: 1.5rem; }

    .transaction-table { width: 100%; border-collapse: collapse; }
    .transaction-table th, .transaction-table td { padding: 1rem; text-align: left; border-bottom: 1px solid var(--color-border); }
    .transaction-table tr:last-child td { border-bottom: none; }
    .transaction-table th { font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
    .transaction-table td .amount { font-weight: 600; font-size: 1rem; }
    .transaction-table td .amount.income { color: var(--color-green); }
    .transaction-table td .amount.expense { color: var(--color-red); }
    .transaction-table .category-badge {
        display: inline-block; padding: 0.25rem 0.75rem; border-radius: 9999px;
        background-color: #f1f5f9; font-size: 0.875rem; font-weight: 500;
    }
    .delete-btn { background: none; border: none; color: var(--color-text-muted); cursor: pointer; transition: color 0.2s; opacity: 0.5; }
    .delete-btn:hover { color: var(--color-red); opacity: 1; }
    
    /* Chart Styles */
    .chart-container {
        width: 100%;
        padding-top: 1rem;
    }
    .chart-label {
        font-size: 10px;
        fill: var(--color-text-muted);
        font-family: 'Inter', sans-serif;
    }
    .chart-grid-line {
        stroke: var(--color-border);
        stroke-dasharray: 2, 2;
    }

    /* Modal Styles */
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(15, 23, 42, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
    }

    .modal-overlay.open {
        opacity: 1;
        visibility: visible;
    }

    .modal-content {
        background: var(--color-background);
        padding: 2rem;
        border-radius: var(--border-radius);
        width: 90%;
        max-width: 600px;
        max-height: 90vh;
        overflow-y: auto;
        transform: scale(0.95) translateY(10px);
        transition: transform 0.3s ease, opacity 0.3s ease;
        opacity: 0;
    }

    .modal-overlay.open .modal-content {
        transform: scale(1) translateY(0);
        opacity: 1;
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
    }

    .modal-header h2 { font-size: 1.5rem; }

    .close-btn {
        background: none;
        border: none;
        cursor: pointer;
        color: var(--color-text-muted);
        padding: 0.5rem;
    }
    .close-btn:hover { color: var(--color-text); }

    .add-transaction-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 2rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid var(--color-border);
    }
    .form-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
    }
    .form-group { display: flex; flex-direction: column; }
    .form-group label {
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: var(--color-text-muted);
    }
    .form-group input, .form-group select {
        padding: 0.75rem;
        border: 1px solid var(--color-border);
        border-radius: 0.5rem;
        font-size: 1rem;
        background-color: var(--color-card);
    }
    .add-btn {
        padding: 0.75rem;
        background-color: var(--color-primary);
        color: white;
        border: none;
        border-radius: 0.5rem;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.2s;
    }
    .add-btn:hover { background-color: #3730a3; }


    @media (max-width: 768px) {
        .page-container { flex-direction: column; }
        .sidebar { 
            position: relative;
            width: 100%; 
            height: auto; 
            border-right: none; 
            border-bottom: 1px solid var(--color-border); 
            flex-direction: row; 
            justify-content: space-between; 
            align-items: center; 
            padding: 1rem;
            overflow-x: visible;
        }
        .sidebar:hover {
            width: 100%;
        }
        .sidebar-header { margin: 0; opacity: 1; }
        .sidebar-nav { display: none; }
        .main-content { padding: 1rem; margin-left: 0; }
        .sidebar:hover ~ .main-content {
          margin-left: 0;
        }
        .app-container { padding: 0; }
        .top-bar { flex-direction: column; gap: 1rem; align-items: stretch; text-align: center; }
        .balance-display, .expense-display { text-align: center; justify-content: center;}
    }
  `}</style>
);

// --- FUNÇÃO AUXILIAR DE FORMATAÇÃO ---
const formatCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

// --- COMPONENTE DO MODAL ---
interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: Transaction[];
  onAddTransaction: (data: NewTransactionData) => void;
  onDeleteTransaction: (id: string) => void;
}

const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onClose, transactions, onAddTransaction, onDeleteTransaction }) => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState<TransactionType>('expense');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text || !amount || !category) {
      // Removido o alert, podemos adicionar uma validação visual no futuro
      console.error('Preencha todos os campos');
      return;
    }
    onAddTransaction({ text, amount: parseFloat(amount), category, type });
    setText('');
    setAmount('');
    setCategory('');
    setType('expense');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay open" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Gerenciar Transações</h2>
          <button onClick={onClose} className="close-btn"><IconClose /></button>
        </div>

        <form onSubmit={handleSubmit} className="add-transaction-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="text">Descrição</label>
              <input id="text" type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Ex: Compras no mercado" />
            </div>
            <div className="form-group">
              <label htmlFor="category">Categoria</label>
              <input id="category" type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder="Ex: Alimentação" />
            </div>
            <div className="form-group">
              <label htmlFor="amount">Valor</label>
              <input id="amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" />
            </div>
            <div className="form-group">
              <label htmlFor="type">Tipo</label>
              <select id="type" value={type} onChange={e => setType(e.target.value as TransactionType)}>
                <option value="expense">Despesa</option>
                <option value="income">Receita</option>
              </select>
            </div>
          </div>
          <button type="submit" className="add-btn">Adicionar Transação</button>
        </form>

        <div className="transactions-list">
          <h3 className="card-title">Histórico</h3>
          <table className="transaction-table">
            <tbody>
              {transactions.map(t => (
                <tr key={t.id}>
                  <td>
                    <div>{t.text}</div>
                    <small style={{ color: 'var(--color-text-muted)' }}>{new Date(t.date).toLocaleDateString('pt-BR')}</small>
                  </td>
                  <td><span className="category-badge">{t.category}</span></td>
                  <td style={{ textAlign: "right" }}>
                    <span className={`amount ${t.type}`}>{formatCurrency(t.amount)}</span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button onClick={() => onDeleteTransaction(t.id)} className="delete-btn" title="Excluir"><IconTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE DO GRÁFICO DE LINHA ---
const LineChart: React.FC<{ data: Transaction[] }> = ({ data }) => {
  if (!data || data.length < 2) {
    return <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>Dados insuficientes para exibir o gráfico. Adicione mais transações.</div>;
  }

  const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  let currentBalance = 0;
  const chartPointsData = sortedData.map(t => {
    currentBalance += t.type === 'income' ? t.amount : -t.amount;
    return { date: new Date(t.date), balance: currentBalance };
  });

  const svgWidth = 800;
  const svgHeight = 250; // Altura do gráfico ajustada
  const margin = { top: 20, right: 20, bottom: 40, left: 60 };
  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;

  const minX = chartPointsData[0].date.getTime();
  const maxX = chartPointsData[chartPointsData.length - 1].date.getTime();
  const balanceValues = chartPointsData.map(d => d.balance);
  const minY = Math.min(...balanceValues);
  const maxY = Math.max(...balanceValues);
  const yAxisMin = Math.min(0, minY);

  const getX = (date: Date) => ((date.getTime() - minX) / (maxX - minX)) * width;
  const getY = (balance: number) => height - ((balance - yAxisMin) / (maxY - yAxisMin)) * height;

  const points = chartPointsData.map(d => `${getX(d.date)},${getY(d.balance)}`).join(' ');

  const yAxisLabels = [yAxisMin, yAxisMin + (maxY - yAxisMin) / 2, maxY];

  return (
    <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ width: '100%', height: 'auto' }}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {/* Grid lines */}
        {yAxisLabels.map((val, i) => (
          <line key={i} className="chart-grid-line" x1="0" y1={getY(val)} x2={width} y2={getY(val)} />
        ))}

        {/* Axes */}
        <line x1="0" y1={height} x2={width} y2={height} stroke="var(--color-border)" />
        <line x1="0" y1="0" x2="0" y2={height} stroke="var(--color-border)" />

        {/* Y-Axis Labels */}
        {yAxisLabels.map((val, i) => (
          <text key={i} className="chart-label" x={-10} y={getY(val) + 4} textAnchor="end">{formatCurrency(val)}</text>
        ))}

        {/* X-Axis Labels */}
        <text className="chart-label" x={getX(chartPointsData[0].date)} y={height + 25} textAnchor="start">{chartPointsData[0].date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</text>
        <text className="chart-label" x={getX(chartPointsData[chartPointsData.length - 1].date)} y={height + 25} textAnchor="end">{chartPointsData[chartPointsData.length - 1].date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</text>

        {/* Chart Line */}
        <polyline fill="none" stroke="var(--color-primary)" strokeWidth="3" points={points} strokeLinecap="round" strokeLinejoin="round" />

        {/* Data points */}
        {chartPointsData.map((d, i) => (
          <circle key={i} cx={getX(d.date)} cy={getY(d.balance)} r="4" fill="var(--color-primary)" />
        ))}
      </g>
    </svg>
  );
};


// --- COMPONENTE PRINCIPAL DA APLICAÇÃO ---
const TrackMoney: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedTransactions = localStorage.getItem('transactions_v7');
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    } else {
      // Dados iniciais de exemplo
      const today = new Date();
      setTransactions([
        { id: '1', text: 'Salário Mensal', amount: 5000, category: 'Salário', date: new Date(today.getFullYear(), today.getMonth(), 1).toISOString(), type: 'income' },
        { id: '2', text: 'Aluguel', amount: 1500, category: 'Moradia', date: new Date(today.getFullYear(), today.getMonth(), 5).toISOString(), type: 'expense' },
        { id: '3', text: 'Mercado', amount: 400, category: 'Alimentação', date: new Date(today.getFullYear(), today.getMonth(), 8).toISOString(), type: 'expense' },
        { id: '4', text: 'Freelance', amount: 800, category: 'Extra', date: new Date(today.getFullYear(), today.getMonth(), 12).toISOString(), type: 'income' },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('transactions_v7', JSON.stringify(transactions));
  }, [transactions]);

  const { income, expense, total } = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);
    const expense = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);
    return { income, expense, total: income - expense };
  }, [transactions]);

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const handleAddTransaction = (data: NewTransactionData) => {
    const newTransaction: Transaction = {
      ...data,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };
    setTransactions(prev => [...prev, newTransaction]);
  };

  return (
    <>
      <GlobalStyles />
      <div className="page-container">
        <aside className="sidebar">
          <div className="sidebar-header">Track Money</div>
          <nav className="sidebar-nav">
            <ul>
              <li><a href="#" className="active"><IconLayoutDashboard /> <span className="nav-text">Dashboard</span></a></li>
              <li><a href="#"><IconChartBar /> <span className="nav-text">Relatórios</span></a></li>
              <li><a href="#"><IconSettings /> <span className="nav-text">Configurações</span></a></li>
            </ul>
          </nav>
        </aside>

        <main className="main-content">
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
                  <div className="expense-icon" onClick={() => setIsModalOpen(true)}>
                    <IconChevronDown />
                  </div>
                </div>
              </div>
              <div className="center-header">
                <div className="logo-container"><IconLogo /></div>
                <h1>Track Money</h1>
                <p>Bem-vindo de volta! Aqui está o resumo das suas finanças.</p>
                <div className="suggestion-chips">
                  <button className="chip" onClick={() => setIsModalOpen(true)}>Adicionar Despesa</button>
                  <button className="chip" onClick={() => setIsModalOpen(true)}>Adicionar Receita</button>
                  <button className="chip">Ver Extrato Completo</button>
                  <button className="chip">Definir Orçamento</button>
                  <button className="chip">Exportar Relatório</button>
                </div>
              </div>
            </header>

            <div className="card-container">
              <div className="card">
                <h2 className="card-title">Evolução do Saldo</h2>
                <div className="chart-container">
                  <LineChart data={transactions} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        transactions={transactions}
        onAddTransaction={handleAddTransaction}
        onDeleteTransaction={handleDeleteTransaction}
      />
    </>
  );
};

export default TrackMoney;

