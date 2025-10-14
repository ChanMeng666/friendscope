'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useHistoryStore } from '@/lib/history-store';
import { getAllAssessmentTypes, getAssessmentConfig } from '@/lib/assessments/registry';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Tooltip,
    Legend,
    ResponsiveContainer,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import {
    TrendingUp,
    Heart,
    AlertTriangle,
    ArrowRight,
    Award,
    Target,
    Activity
} from 'lucide-react';
import GEOHead from '@/components/GEOHead';
import { LottieAnimation } from '@/components/LottieAnimation';

export default function DashboardPage() {
    const router = useRouter();
    const { assessments } = useHistoryStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const assessmentTypes = getAllAssessmentTypes();

    // 按类型分组统计
    const statsByType = assessmentTypes.map(type => {
        const typeAssessments = assessments.filter(a => a.assessmentType === type.type);
        const avgScore = typeAssessments.length > 0
            ? typeAssessments.reduce((sum, a) => sum + a.overallScore, 0) / typeAssessments.length
            : 0;

        return {
            type: type.type,
            name: type.name,
            icon: type.icon,
            color: type.color,
            count: typeAssessments.length,
            avgScore: Math.round(avgScore * 10) / 10,
            assessments: typeAssessments
        };
    });

    // 整体统计
    const totalAssessments = assessments.length;
    const overallAvgScore = totalAssessments > 0
        ? Math.round((assessments.reduce((sum, a) => sum + a.overallScore, 0) / totalAssessments) * 10) / 10
        : 0;
    const uniquePeople = new Set(assessments.map(a => a.targetName || a.friendName)).size;

    // 找出最佳和最需关注的关系
    const sortedAssessments = [...assessments].sort((a, b) => b.overallScore - a.overallScore);
    const topRelationships = sortedAssessments.slice(0, 3);
    const concerningRelationships = sortedAssessments.slice(-3).reverse();

    // 雷达图数据（各类型平均分）
    const radarData = statsByType.map(stat => ({
        type: stat.name.split(' ')[0], // 简化名称
        score: stat.avgScore
    }));

    // 饼图数据（各类型数量分布）
    const pieData = statsByType.filter(s => s.count > 0).map(stat => ({
        name: stat.name,
        value: stat.count
    }));

    const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ec4899'];

    // 空状态
    if (totalAssessments === 0) {
        return (
            <>
                <GEOHead pageType="dashboard" />
                <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
                    <div className="container mx-auto px-4 py-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center"
                        >
                            <div className="w-64 h-64 mx-auto mb-8">
                                <LottieAnimation
                                    path="/Lottie/empty-box.json"
                                    className="w-full h-full"
                                />
                            </div>
                            <h2 className="text-3xl font-bold mb-4">No Data Yet</h2>
                            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                                Start taking assessments to see your relationship dashboard with insights and analytics.
                            </p>
                            <Button
                                onClick={() => router.push('/assess')}
                                size="lg"
                                className="bg-gradient-to-r from-primary to-purple-600"
                            >
                                Take Your First Assessment
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <GEOHead pageType="dashboard" />
            <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                            Relationship Dashboard
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Your comprehensive relationship health overview
                        </p>
                    </motion.div>

                    {/* Overall Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <Card className="bg-white/50 backdrop-blur-sm border-none">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">
                                        Total Assessments
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <div className="text-3xl font-bold">{totalAssessments}</div>
                                        <Activity className="h-8 w-8 text-blue-500" />
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card className="bg-white/50 backdrop-blur-sm border-none">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">
                                        Overall Average
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <div className="text-3xl font-bold">{overallAvgScore}%</div>
                                        <Target className="h-8 w-8 text-green-500" />
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Card className="bg-white/50 backdrop-blur-sm border-none">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">
                                        People Assessed
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <div className="text-3xl font-bold">{uniquePeople}</div>
                                        <Heart className="h-8 w-8 text-pink-500" />
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Card className="bg-white/50 backdrop-blur-sm border-none">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">
                                        Assessment Types
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <div className="text-3xl font-bold">{statsByType.filter(s => s.count > 0).length}</div>
                                        <Award className="h-8 w-8 text-orange-500" />
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        {/* Radar Chart */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Card className="bg-white/50 backdrop-blur-sm border-none">
                                <CardHeader>
                                    <CardTitle>Relationship Type Comparison</CardTitle>
                                    <CardDescription>Average scores across different relationship types</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <RadarChart data={radarData}>
                                                <PolarGrid />
                                                <PolarAngleAxis dataKey="type" />
                                                <PolarRadiusAxis domain={[0, 100]} />
                                                <Radar
                                                    name="Average Score"
                                                    dataKey="score"
                                                    stroke="#3b82f6"
                                                    fill="#3b82f6"
                                                    fillOpacity={0.6}
                                                />
                                                <Tooltip />
                                                <Legend />
                                            </RadarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Pie Chart */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Card className="bg-white/50 backdrop-blur-sm border-none">
                                <CardHeader>
                                    <CardTitle>Assessment Distribution</CardTitle>
                                    <CardDescription>Number of assessments by type</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={pieData}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    label={({ name, percent }) => `${name.split(' ')[0]}: ${(percent * 100).toFixed(0)}%`}
                                                    outerRadius={80}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                >
                                                    {pieData.map((entry, index) => (
                                                        <Cell key={`cell-${index}-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Assessment Types Detail Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mb-8"
                    >
                        <h2 className="text-2xl font-bold mb-4">Assessment Types Overview</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {statsByType.map((stat, index) => {
                                const Icon = stat.icon;
                                return (
                                    <Card
                                        key={stat.type}
                                        className="bg-white/50 backdrop-blur-sm border-none hover:bg-white/60 transition-all duration-300 cursor-pointer"
                                        onClick={() => router.push(`/assess/${stat.type}`)}
                                    >
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color.gradient} flex items-center justify-center`}>
                                                        <Icon className="w-6 h-6 text-white" />
                                                    </div>
                                                    <div>
                                                        <CardTitle>{stat.name}</CardTitle>
                                                        <CardDescription>{stat.count} assessments</CardDescription>
                                                    </div>
                                                </div>
                                                <Badge variant={stat.avgScore >= 70 ? "default" : stat.avgScore >= 50 ? "secondary" : "destructive"}>
                                                    {stat.count > 0 ? `${stat.avgScore}%` : 'No data'}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            {stat.count > 0 ? (
                                                <div className="space-y-2">
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className={`h-2 rounded-full bg-gradient-to-r ${stat.color.gradient}`}
                                                            style={{ width: `${stat.avgScore}%` }}
                                                        />
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">
                                                        Average score: {stat.avgScore}%
                                                    </p>
                                                </div>
                                            ) : (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="w-full"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        router.push(`/assess/${stat.type}`);
                                                    }}
                                                >
                                                    Take First Assessment
                                                    <ArrowRight className="ml-2 h-4 w-4" />
                                                </Button>
                                            )}
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Top and Concerning Relationships */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Top Relationships */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            <Card className="bg-white/50 backdrop-blur-sm border-none">
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="h-5 w-5 text-green-500" />
                                        <CardTitle>Strongest Relationships</CardTitle>
                                    </div>
                                    <CardDescription>Your healthiest connections</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {topRelationships.map((assessment, index) => {
                                            const config = getAssessmentConfig(assessment.assessmentType || 'friendship');
                                            const Icon = config?.icon;
                                            return (
                                                <div
                                                    key={assessment.id}
                                                    className="flex items-center justify-between p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors cursor-pointer"
                                                    onClick={() => router.push(`/results/${assessment.id}`)}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-200">
                                                            <span className="font-bold text-green-700">{index + 1}</span>
                                                        </div>
                                                        {Icon && <Icon className="h-4 w-4 text-green-600" />}
                                                        <div>
                                                            <p className="font-medium">{assessment.targetName || assessment.friendName}</p>
                                                            <p className="text-sm text-muted-foreground">{config?.name || 'Assessment'}</p>
                                                        </div>
                                                    </div>
                                                    <Badge className="bg-green-500">{Math.round(assessment.overallScore)}%</Badge>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Concerning Relationships */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            <Card className="bg-white/50 backdrop-blur-sm border-none">
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                                        <CardTitle>Needs Attention</CardTitle>
                                    </div>
                                    <CardDescription>Relationships that could use some care</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {concerningRelationships.map((assessment, index) => {
                                            const config = getAssessmentConfig(assessment.assessmentType || 'friendship');
                                            const Icon = config?.icon;
                                            return (
                                                <div
                                                    key={assessment.id}
                                                    className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 hover:bg-yellow-100 transition-colors cursor-pointer"
                                                    onClick={() => router.push(`/results/${assessment.id}`)}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-200">
                                                            <span className="font-bold text-yellow-700">{index + 1}</span>
                                                        </div>
                                                        {Icon && <Icon className="h-4 w-4 text-yellow-600" />}
                                                        <div>
                                                            <p className="font-medium">{assessment.targetName || assessment.friendName}</p>
                                                            <p className="text-sm text-muted-foreground">{config?.name || 'Assessment'}</p>
                                                        </div>
                                                    </div>
                                                    <Badge variant="secondary">{Math.round(assessment.overallScore)}%</Badge>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
}
