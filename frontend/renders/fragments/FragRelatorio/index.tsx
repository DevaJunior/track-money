import './styles.css';
import '../../../global/styles.css';
import React, { useMemo, useState } from 'react';


import type { BarChartData, ChartData, Transaction } from '../../../global/types';
import PieChart from '../../components/Graficos/PieChart';
import BarChart from './../../components/Graficos/BarChart/index';
import DonutChart from './../../components/Graficos/DonutChart/index';


// O restante do arquivo permanece o mesmo...
const CHART_COLORS = ['#4338ca', '#3b82f6', '#10b981', '#f97316', '#ef4444', '#8b5cf6', '#ec4899'];

const StatCard: React.FC<{ title: string; value: string; className?: string }> = ({ title, value, className }) => (
    <div className="stat-card">
        <h3 className="stat-card-title">{title}</h3>
        <p className={`stat-card-value ${className || ''}`}>{value}</p>
    </div>
);

const formatCurrency = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

interface FragRelatorioProps {
    transactions: Transaction[];
}

const FragRelatorio: React.FC<FragRelatorioProps> = ({ transactions }) => {
    const monthlyTransactions = useMemo(() => {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        return transactions.filter(t => {
            const transactionDate = new Date(t.date);
            return transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear;
        });
    }, [transactions]);

    const stats = useMemo(() => {
        const totalIncome = monthlyTransactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
        const totalExpense = monthlyTransactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
        const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;
        return { totalIncome, totalExpense, savingsRate };
    }, [monthlyTransactions]);

    const donutChartData = useMemo((): ChartData[] => { // Renomeado para clareza
        const expenses = monthlyTransactions.filter(t => t.type === 'expense');
        if (expenses.length === 0) return [];
        const categoryMap = expenses.reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + t.amount;
            return acc;
        }, {} as { [key: string]: number });

        return Object.entries(categoryMap).map(([name, value], index) => ({
            name,
            value,
            color: CHART_COLORS[index % CHART_COLORS.length]
        })).sort((a, b) => b.value - a.value);
    }, [monthlyTransactions]);

    const barChartData = useMemo((): BarChartData[] => {
        return [{
            name: new Date().toLocaleString('pt-BR', { month: 'long' }),
            income: stats.totalIncome,
            expense: stats.totalExpense,
        }];
    }, [stats]);

    const top5Expenses = useMemo(() => {
        return monthlyTransactions.filter(t => t.type === 'expense').sort((a, b) => b.amount - a.amount).slice(0, 5);
    }, [monthlyTransactions]);

    return (
        <div className="app-container">
            <header className="reports-header">
                <h1>Relatório Mensal</h1>
                <p>Aqui está um resumo completo das suas atividades financeiras no mês de {new Date().toLocaleString('pt-BR', { month: 'long' })}.</p>
            </header>

            <div className="report-grid">
                <StatCard title="Receita Total" value={formatCurrency(stats.totalIncome)} className="positive" />
                <StatCard title="Despesa Total" value={formatCurrency(stats.totalExpense)} className="negative" />
                <StatCard title="Taxa de Poupança" value={`${stats.savingsRate.toFixed(1)}%`} className={stats.savingsRate >= 0 ? 'positive' : 'negative'} />

                <div className="chart-card bar">
                    <BarChart title="Receita vs. Despesa" data={barChartData} />
                </div>
                <div className="chart-card pie"> {/* A classe pode continuar a mesma */}
                    {/* ATUALIZE O NOME DO COMPONENTE AQUI */}
                    <DonutChart title="Despesas por Categoria" data={donutChartData} />
                </div>

                <div className="table-card card">
                    <h2 className="card-title">Top 5 Maiores Despesas do Mês</h2>
                    {top5Expenses.length > 0 ? (
                        <table className="top-expenses-table">
                            <thead>
                                <tr>
                                    <th>Descrição</th>
                                    <th>Categoria</th>
                                    <th style={{ textAlign: "right" }}>Valor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {top5Expenses.map(t => (
                                    <tr key={t.id}>
                                        <td>{t.text}</td>
                                        <td>{t.category}</td>
                                        <td className="amount">{formatCurrency(t.amount)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p style={{ textAlign: 'center', padding: '1rem' }}>Nenhuma despesa registrada este mês.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FragRelatorio;