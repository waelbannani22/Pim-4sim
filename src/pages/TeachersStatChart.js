// material
import { Icon } from '@iconify/react';

import plusFill from '@iconify/icons-eva/plus-fill';
import {
    Box,
    Grid,
    Card,
    Table,
    Stack,
    Avatar,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination
} from '@mui/material';
// components
import { Link as RouterLink } from 'react-router-dom';
import Page from '../components/Page';
import {
    AppTasks,
    AppNewUsers,
    AppBugReports,
    AppItemOrders,
    AppNewsUpdate,
    AppWeeklySales,
    AppOrderTimeline,
    AppWebsiteVisits,
    AppTrafficBySite,
    AppCurrentSubject,
    AppConversionRates
} from '../components/_dashboard/app';
import React, { useEffect, useState, PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer ,Legend} from 'recharts';
import axios from "axios";

// ----------------------------------------------------------------------

export default function TeacherChart() {
    const [nbRefused, setRefused] = useState(0);
    const [nbAccepted, setAccepted] = useState(0);
    const [name, setName] = useState('');
    const accept = async () => {
        try {


            var config2 = {
                method: 'get',
                url: 'http://localhost:5000/admin/fetchChart',
                headers: {
                    'Content-Type': 'application/json',

                },

            };
            await axios(config2)
                .then(function (response1) {

                    var result = response1.data.data.nbAccepted
                    setAccepted(response1.data.data.nbAccepted)
                    setRefused(response1.data.data.nbRefused)

                })
                .catch(function (error) {
                    console.log(error);
                });
            //console.log(data);
        } catch (error) {
            console.log("failure")
        }

    };
    useEffect(() => {
        accept()
    }, [])

    
    const data = [
        { name: 'Teacher refused', value: nbRefused },
        { name: 'Teacher accepted', value: nbAccepted },
        
    ];
    const data1 = [
        { name: '4sim1 homework done ', value: 25 },
        { name: '4sim2 homework done ', value: 20 },
        { name: '4sim3 homework done ', value: 23 },
      
    ];
    const data2 = [
        { name: '4sim1 absence per week ', value: 50 },
        { name: '4sim2 absence per week ', value: 60 },
        { name: '4sim3 absence per week ', value: 100 },
        
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FC3B11 '];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    const renderCustomizedLabel2 = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    const renderCustomizedLabel3 = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    var demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj';
    return (

        <Page title="Dashboard | Minimal-UI">
            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                   
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <PieChart width={300} height={400}>
                        <Legend/>
                        
                            <Pie
                                
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={true}
                               
                                label={renderCustomizedLabel}
                                outerRadius={90}
                                
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length +1]} />
                                ))}
                            </Pie>
                            <legend> teachers</legend>
                            <title text="teachers"/>
                        </PieChart>
                        <PieChart width={300} height={400}>
                        <Legend/>
                            <Pie
                                data={data1}
                                cx="50%"
                                cy="50%"
                                labelLine={true}
                                label={renderCustomizedLabel2}
                                outerRadius={80}
                                fill="#8884d1"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index+1}`} fill={COLORS[index % COLORS.length+1]} />
                                ))}
                            </Pie>
                        </PieChart>
                        </Stack>
                        <PieChart width={300} height={400} >
                        <Legend/>
                            <Pie
                                data={data2}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel3}
                                outerRadius={80}
                                fill="#8F84d1"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length+1]} />
                                ))}
                            </Pie>
                        </PieChart>
                   
            </Container>
        </Page>
    );
}
