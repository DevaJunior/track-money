import React from 'react';
import './styles.css';
import type { ChartData } from '../../../../global/types';

// Props para o componente PieChart
interface PieChartProps {
    data: ChartData[];
    title: string;
}

// Componente do Gráfico de Pizza (PieChart)
const PieChart: React.FC<PieChartProps> = ({ data, title }) => {
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
                <div className="pie-chart-wrapper">
                    <div className="pie-chart-container">
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
                        </svg>
                    </div>
                    <ul className="chart-legend">
                        {data.map(item => (
                            <li key={item.name}>
                                <span className="legend-color-box" style={{ backgroundColor: item.color }}></span>
                                {item.name} ({item.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })})
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

export default PieChart;