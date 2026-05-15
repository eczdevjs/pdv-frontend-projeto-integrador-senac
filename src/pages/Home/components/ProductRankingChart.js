import Reac from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';


export default function ProductRankingChart({ data, type}) {
    const isRevenue = type === 'revenue';

    const chartData = data.map(item => ({
        id: item.id,
        name: item.name.length > 15 ? `${item.name.substring(0, 12)}...` : item.name,
        value: isRevenue ? parseFloat(item.total_revenue) : parseInt(item.total_units),
        revenue: parseFloat(item.total_revenue)
    }));

    return (
        <div style={{ width: '100%', height: 400, backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '20px', fontFamily: 'sans-serif' }}>
                {isRevenue? 'Top Faturamento (R$)':'Top 10 Produtos do mês'}
            </h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }} >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" interval={0} angle={-45} textAnchor='end' height={70} />
                    <YAxis allowDecimals={isRevenue ? true : false} yAxisId="left" orientation='left' stroke='#8884d8' />
                    <YAxis allowDecimals={isRevenue ? true : false} yAxisId="right" orientation="right" stroke="#82acca" />
                    <Tooltip
                        formatter = {(value) => 
                            isRevenue ? `R$ ${value.toLocaleString('pt-BR')}` : value
                        }
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                        contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }} />
                    <Legend verticalAlign='top' height={36} />
                    <Bar 
                    dataKey='value'
                    yAxisId='right' 
                    dataKey=  'value' 
                    name= {isRevenue ? 'Faturamento' : 'Unidades'} 
                    fill={ isRevenue ? ' #82caa4': '#3b82f6'} 
                    radius={[4, 4, 0, 0]}
                    barSize={40} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

