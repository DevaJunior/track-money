import React from 'react';
import './styles.css';
import type { BarChartData } from '../../../../global/types';

interface BarChartProps {
    data: BarChartData[];
    title: string; // Adicionamos a prop de título
}

const formatCurrency = (value: number) => {
    if (value >= 1000) {
        return `R$ ${(value / 1000).toFixed(1)}k`;
    }
    return `R$ ${value.toFixed(0)}`;
};

const BarChart: React.FC<BarChartProps> = ({ data, title }) => {
    // A condição de dados insuficientes agora checa se há valores maiores que zero
    if (!data || data.length === 0 || data.every(d => d.income === 0 && d.expense === 0)) {
        return (
            <div className="card">
                <h2 className="card-title">{title}</h2>
                <p className="empty-chart-message">Dados insuficientes para o gráfico de barras.</p>
            </div>
        );
    }

    const maxValue = Math.max(1, ...data.map(d => Math.max(d.income, d.expense)));
    const yAxisLabels = [0, maxValue / 2, maxValue];

    const scale = (value: number) => (value / maxValue) * 100;

    return (
        // ADICIONAMOS O WRAPPER "card" AQUI
        <div className="card">
            <h2 className="card-title">{title}</h2>
            <div className="bar-chart-container">
                <div className="y-axis">
                    {yAxisLabels.map((label, i) => (
                        <div key={i} className="y-axis-label">
                            <span>{formatCurrency(label)}</span>
                        </div>
                    ))}
                </div>
                <div className="bars-area">
                    {data.map((item) => (
                        <div key={item.name} className="bar-group">
                            <div className="bar-wrapper">
                                <div className="bar income" style={{ height: `${scale(item.income)}%` }} title={`Receita: ${item.income.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}></div>
                                <div className="bar expense" style={{ height: `${scale(item.expense)}%` }} title={`Despesa: ${item.expense.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}></div>
                            </div>
                            <div className="bar-label">{item.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BarChart;