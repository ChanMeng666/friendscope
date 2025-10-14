import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

interface MetricProps {
    data: {
        date: string
        value: number
    }[]
    title: string
    description?: string
}

// 定义自定义提示框的类型
interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{
        value: number;
        dataKey: string | number;
        payload: {
            date: string;
            value: number;
        };
    }>;
    label?: string;
}

export function LineMetric({ data, title, description }: MetricProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="date"
                            />
                            <YAxis
                                label={{
                                    value: 'Score (%)',
                                    angle: -90,
                                    position: 'insideLeft',
                                    offset: 10
                                }}
                                domain={[0, 100]}
                            />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="value"
                                name="Score"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                activeDot={{
                                    r: 6,
                                    style: { fill: "#3b82f6", opacity: 0.8 }
                                }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}

export function BarMetric({ data, title, description }: MetricProps) {
    // 使用类型安全的自定义提示框组件
    const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
        if (active && payload && payload.length > 0) {
            return (
                <div className="bg-white p-4 rounded-lg shadow-lg border">
                    <p className="font-bold">{label}</p>
                    <p className="text-blue-600">{`Score: ${payload[0].value}%`}</p>
                </div>
            );
        }
        return null;
    };

    interface BarEventPayload {
        value: number;
        payload: {
            date: string;
            value: number;
        };
    }

    return (
        <Card className="w-full">
            <CardHeader className="px-2 sm:px-6">
                <CardTitle>{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent className="p-0">
                <div className="w-full px-2 sm:px-6 pb-6">
                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={data}
                                margin={{
                                    top: 20,
                                    right: 20,
                                    left: 20,
                                    bottom: 20
                                }}
                                barSize={40}
                            >
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    horizontal={true}
                                    vertical={true}
                                />
                                <XAxis
                                    dataKey="date"
                                    interval={0}
                                    angle={-45}
                                    textAnchor="end"
                                    height={90}
                                    tick={{
                                        fontSize: 12,
                                        fill: '#666',
                                        fontWeight: '500'
                                    }}
                                />
                                <YAxis
                                    domain={[0, 100]}
                                    label={{
                                        value: 'Score (%)',
                                        angle: -90,
                                        position: 'insideLeft',
                                        offset: -5,
                                        fill: '#666'
                                    }}
                                    tick={{
                                        fontSize: 12,
                                        fill: '#666'
                                    }}
                                    width={60}
                                />
                                <Tooltip
                                    content={<CustomTooltip />}
                                    cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                                />
                                <Legend
                                    wrapperStyle={{
                                        paddingTop: '20px'
                                    }}
                                />
                                <Bar
                                    dataKey="value"
                                    name="Category Score"
                                    fill="#3b82f6"
                                    radius={[4, 4, 0, 0]}
                                    animationBegin={0}
                                    animationDuration={1500}
                                    onMouseEnter={(_data: BarEventPayload) => {
                                        // hover 效果处理
                                    }}
                                    onClick={(_data: BarEventPayload) => {
                                        // 点击效果处理
                                    }}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
