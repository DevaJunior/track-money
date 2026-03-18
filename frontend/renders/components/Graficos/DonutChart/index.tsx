import React from 'react';
import './styles.css';
import type { ChartData } from '../../../../global/types';


interface DonutChartProps {
    data: ChartData[];
    title: string;
}

const DonutChart: React.FC<DonutChartProps> = ({ data, title }) => {
    const totalValue = data.reduce((acc, item) => acc + item.value, 0);

    const getCoordinatesForPercent = (percent: number) => {
        const x = Math.cos(2 * Math.PI * percent);
        const y = Math.sin(2 * Math.PI * percent);
        return [x, y];
    };

    return (
        <div className="card">
            <h2 className="card-title">{title}</h2>
            {data.length > 0 ? (
                <div className="donut-chart-wrapper">
                    <div className="donut-chart-container">
                        <svg viewBox="-1 -1 2 2" style={{ transform: 'rotate(-90deg)' }}>
                            {(() => {
                                let cumulativeAngle = 0;
                                return data.map((slice) => {
                                    const [startX, startY] = getCoordinatesForPercent(cumulativeAngle);
                                    const sliceAngle = slice.value / totalValue;
                                    cumulativeAngle += sliceAngle;
                                    const [endX, endY] = getCoordinatesForPercent(cumulativeAngle);
                                    const largeArcFlag = sliceAngle > 0.5 ? 1 : 0;
                                    
                                    const pathData = `M ${startX} ${startY} A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY} L 0 0`;

                                    return <path key={slice.name} d={pathData} fill={slice.color} />;
                                });
                            })()}
                            <circle cx="0" cy="0" r="0.6" fill="var(--color-card)" />
                        </svg>
                        {/* ADICIONANDO O VALOR TOTAL NO CENTRO */}
                        <div className="donut-chart-total">
                            <span>Total</span>
                            <p>{totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        </div>
                    </div>
                    <ul className="chart-legend">
                        {data.map(item => (
                            <li key={item.name}>
                                <span className="legend-color-box" style={{ backgroundColor: item.color }}></span>
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="empty-chart-message">Não há dados para exibir o gráfico.</p>
            )}
        </div>
    );
};

export default DonutChart;