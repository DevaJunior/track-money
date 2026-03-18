import './styles.css';
import type { Transaction } from '../../../../global/types';
import React from 'react';

const formatCurrency = (value: number): string => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export const LineChart: React.FC<{ data: Transaction[] }> = ({ data }) => {
    // ... (Cole aqui o código do componente LineChart da versão anterior)
    // O código é longo, para evitar repetição, por favor copie o componente da resposta anterior.
    // Lembre-se de ajustar os imports e props se necessário.
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
    const svgHeight = 250;
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
                {yAxisLabels.map((val, i) => (
                    <line key={i} className="chart-grid-line" x1="0" y1={getY(val)} x2={width} y2={getY(val)} />
                ))}
                <line x1="0" y1={height} x2={width} y2={height} stroke="var(--color-border)" />
                <line x1="0" y1="0" x2="0" y2={height} stroke="var(--color-border)" />
                {yAxisLabels.map((val, i) => (
                    <text key={i} className="chart-label" x={-10} y={getY(val) + 4} textAnchor="end">{formatCurrency(val)}</text>
                ))}
                <text className="chart-label" x={getX(chartPointsData[0].date)} y={height + 25} textAnchor="start">{chartPointsData[0].date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</text>
                <text className="chart-label" x={getX(chartPointsData[chartPointsData.length - 1].date)} y={height + 25} textAnchor="end">{chartPointsData[chartPointsData.length - 1].date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</text>
                <polyline fill="none" stroke="var(--color-primary)" strokeWidth="3" points={points} strokeLinecap="round" strokeLinejoin="round" />
                {chartPointsData.map((d, i) => (
                    <circle key={i} cx={getX(d.date)} cy={getY(d.balance)} r="4" fill="var(--color-primary)" />
                ))}
            </g>
        </svg>
    );
};