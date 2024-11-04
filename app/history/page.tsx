// 'use client'
//
// import { useState } from 'react'
// import { useHistoryStore } from '@/lib/history-store'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow
// } from '@/components/ui/table'
// import { useRouter } from 'next/navigation'
// import {
//     LineChart,
//     Line,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     Legend,
//     ResponsiveContainer,
// } from 'recharts';
// import { format } from 'date-fns'
// import { Heart, AlertTriangle, Shield } from 'lucide-react'
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu'
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
// } from "@/components/ui/dialog"
// import { Settings, Eye, Trash } from 'lucide-react';
//
// export default function HistoryPage() {
//     const router = useRouter()
//     const { assessments, removeAssessment, clearHistory } = useHistoryStore()
//     const [showClearDialog, setShowClearDialog] = useState(false)
//
//     const getScoreColor = (score: number) => {
//         if (score >= 85) return "text-green-500"
//         if (score >= 70) return "text-blue-500"
//         if (score >= 50) return "text-yellow-500"
//         return "text-red-500"
//     }
//
//     const getScoreIcon = (score: number) => {
//         if (score >= 70) return <Heart className="w-4 h-4 text-green-500" />
//         if (score >= 50) return <Shield className="w-4 h-4 text-yellow-500" />
//         return <AlertTriangle className="w-4 h-4 text-red-500" />
//     }
//
//     const trendData = assessments
//         .slice()
//         .reverse()
//         .map((assessment) => ({
//             date: format(new Date(assessment.date), 'MMM d'),
//             score: Math.round(assessment.overallScore),
//         }));
//
//     return (
//         <div className="container mx-auto px-4 py-8">
//             <div className="flex justify-between items-center mb-8">
//                 <h1 className="text-3xl font-bold">Assessment History</h1>
//                 <Button
//                     variant="destructive"
//                     onClick={() => setShowClearDialog(true)}
//                     disabled={assessments.length === 0}
//                 >
//                     Clear History
//                 </Button>
//             </div>
//
//             {/* Trend Chart */}
//             {assessments.length > 0 && (
//                 <Card className="mb-8">
//                     <CardHeader>
//                         <CardTitle>Friendship Health Trend</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="h-[300px]">
//                             <ResponsiveContainer width="100%" height="100%">
//                                 <LineChart data={trendData}>
//                                     <CartesianGrid strokeDasharray="3 3" />
//                                     <XAxis dataKey="date" />
//                                     <YAxis domain={[0, 100]} />
//                                     <Tooltip />
//                                     <Legend />
//                                     <Line
//                                         type="monotone"
//                                         dataKey="score"
//                                         stroke="#3B82F6"
//                                         strokeWidth={2}
//                                     />
//                                 </LineChart>
//                             </ResponsiveContainer>
//                         </div>
//                     </CardContent>
//                 </Card>
//             )}
//
//             {/* History Table */}
//             {assessments.length > 0 ? (
//                 <Card>
//                     <Table>
//                         <TableHeader>
//                             <TableRow>
//                                 <TableHead>Date</TableHead>
//                                 <TableHead>Friend</TableHead>
//                                 <TableHead>Score</TableHead>
//                                 <TableHead>Status</TableHead>
//                                 <TableHead className="text-right">Actions</TableHead>
//                             </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                             {assessments.map((assessment) => (
//                                 <TableRow key={assessment.id}>
//                                     <TableCell>
//                                         {format(new Date(assessment.date), 'MMM d, yyyy')}
//                                     </TableCell>
//                                     <TableCell>{assessment.friendName}</TableCell>
//                                     <TableCell>
//                                         <div className="flex items-center gap-2">
//                                             {getScoreIcon(assessment.overallScore)}
//                                             <span className={getScoreColor(assessment.overallScore)}>
//                         {Math.round(assessment.overallScore)}%
//                       </span>
//                                         </div>
//                                     </TableCell>
//                                     <TableCell>{assessment.assessment.message}</TableCell>
//                                     <TableCell className="text-right">
//                                         <DropdownMenu>
//                                             <DropdownMenuTrigger asChild>
//                                                 {/*<Button variant="ghost" size="sm">*/}
//                                                 {/*    Actions*/}
//                                                 {/*</Button>*/}
//                                                 <Button variant="default" size="sm" className="bg-primary text-white hover:bg-primary/90">
//                                                     <Settings className="h-4 w-4 mr-1" />
//                                                     Actions
//                                                 </Button>
//                                             </DropdownMenuTrigger>
//                                             <DropdownMenuContent>
//                                                 <DropdownMenuItem
//                                                     className="cursor-pointer flex items-center"
//                                                     onClick={() => router.push(`/results/${assessment.id}`)}
//                                                 >
//                                                     <Eye className="h-4 w-4 mr-2" />
//                                                     View Details
//                                                 </DropdownMenuItem>
//                                                 <DropdownMenuItem
//                                                     onClick={() => removeAssessment(assessment.id)}
//                                                     className="cursor-pointer flex items-center text-red-600 focus:text-red-600"
//                                                 >
//                                                     <Trash className="h-4 w-4 mr-2" />
//                                                     Delete
//                                                 </DropdownMenuItem>
//                                             </DropdownMenuContent>
//                                         </DropdownMenu>
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </Card>
//             ) : (
//                 <div className="text-center py-8">
//                     <p className="text-gray-500">No assessment history yet.</p>
//                     <Button
//                         className="mt-4"
//                         onClick={() => router.push('/assess')}
//                     >
//                         Start New Assessment
//                     </Button>
//                 </div>
//             )}
//
//             {/* Clear History Dialog */}
//             <Dialog open={showClearDialog} onOpenChange={setShowClearDialog}>
//                 <DialogContent>
//                     <DialogHeader>
//                         <DialogTitle>Clear History</DialogTitle>
//                         <DialogDescription>
//                             Are you sure you want to clear all assessment history? This action cannot be undone.
//                         </DialogDescription>
//                     </DialogHeader>
//                     <DialogFooter>
//                         <Button
//                             variant="outline"
//                             onClick={() => setShowClearDialog(false)}
//                         >
//                             Cancel
//                         </Button>
//                         <Button
//                             variant="destructive"
//                             onClick={() => {
//                                 clearHistory()
//                                 setShowClearDialog(false)
//                             }}
//                         >
//                             Clear History
//                         </Button>
//                     </DialogFooter>
//                 </DialogContent>
//             </Dialog>
//         </div>
//     )
// }



'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useHistoryStore } from '@/lib/history-store'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LottieAnimation } from '@/components/LottieAnimation'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { format } from 'date-fns'
import {
    Heart,
    AlertTriangle,
    Shield,
    Settings,
    Eye,
    Trash,
    ArrowRight,
    Filter,
    SlidersHorizontal,
    CalendarRange,
    Search,
    ChevronDown,
    BarChart3,
    LineChart,
    PieChart
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
    LineChart as RechartsLineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar
} from 'recharts';

// Score indicator component with animation
const ScoreIndicator = ({ score }: { score: number }) => {
    const getColor = (value: number) => {
        if (value >= 85) return 'text-green-500'
        if (value >= 70) return 'text-blue-500'
        if (value >= 50) return 'text-yellow-500'
        return 'text-red-500'
    }

    const getIcon = (value: number) => {
        if (value >= 70) return <Heart className="w-5 h-5" />
        if (value >= 50) return <Shield className="w-5 h-5" />
        return <AlertTriangle className="w-5 h-5" />
    }

    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`flex items-center gap-2 ${getColor(score)}`}
        >
            {getIcon(score)}
            <span className="font-bold">{Math.round(score)}%</span>
        </motion.div>
    )
}

// Empty state component
const EmptyState = () => {
    const router = useRouter()
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
        >
            <div className="w-64 h-64 mx-auto mb-8">
                <LottieAnimation
                    path="/Lottie/empty-box.json"
                    className="w-full h-full"
                />
            </div>
            <h3 className="text-2xl font-bold mb-4">No Assessments Yet</h3>
            <p className="text-muted-foreground mb-8">
                Start your first friendship assessment to begin tracking your relationships.
            </p>
            <Button
                onClick={() => router.push('/assess')}
                className="group relative overflow-hidden bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700"
            >
                Start Assessment
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Button>
        </motion.div>
    )
}

export default function HistoryPage() {
    const router = useRouter()
    const { assessments, removeAssessment, clearHistory } = useHistoryStore()
    const [showClearDialog, setShowClearDialog] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedView, setSelectedView] = useState<'table' | 'cards' | 'charts'>('cards')
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [assessmentToDelete, setAssessmentToDelete] = useState<string | null>(null)

    // Filtered assessments based on search term
    const filteredAssessments = assessments.filter(assessment =>
        assessment.friendName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assessment.assessment.message.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Prepare chart data
    const trendData = assessments
        .slice()
        .reverse()
        .map((assessment) => ({
            date: format(new Date(assessment.date), 'MMM d'),
            score: Math.round(assessment.overallScore),
            friend: assessment.friendName
        }))

    // Calculate average scores by friend
    const averagesByFriend = assessments.reduce((acc, assessment) => {
        if (!acc[assessment.friendName]) {
            acc[assessment.friendName] = {
                total: 0,
                count: 0
            }
        }
        acc[assessment.friendName].total += assessment.overallScore
        acc[assessment.friendName].count += 1
        return acc
    }, {} as Record<string, { total: number; count: number }>)

    const averagesData = Object.entries(averagesByFriend).map(([friend, data]) => ({
        friend,
        average: Math.round(data.total / data.count)
    }))

    const handleDelete = (id: string) => {
        setAssessmentToDelete(id)
        setShowDeleteDialog(true)
    }

    const confirmDelete = () => {
        if (assessmentToDelete) {
            removeAssessment(assessmentToDelete)
            setShowDeleteDialog(false)
            setAssessmentToDelete(null)
        }
    }

    if (assessments.length === 0) {
        return <EmptyState />
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                                Assessment History
                            </h1>
                            <p className="text-muted-foreground">
                                Track your friendship assessment results over time
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                <Input
                                    placeholder="Search assessments..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="gap-2">
                                        <SlidersHorizontal className="h-4 w-4" />
                                        View
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => setSelectedView('cards')}>
                                        <BarChart3 className="h-4 w-4 mr-2" />
                                        Cards
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSelectedView('table')}>
                                        <Filter className="h-4 w-4 mr-2" />
                                        Table
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSelectedView('charts')}>
                                        <LineChart className="h-4 w-4 mr-2" />
                                        Charts
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button
                                variant="destructive"
                                onClick={() => setShowClearDialog(true)}
                                className="gap-2"
                            >
                                <Trash className="h-4 w-4" />
                                Clear History
                            </Button>
                        </div>
                    </div>
                </motion.div>

                {/* Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="bg-white/50 backdrop-blur-sm border-none">
                        <CardHeader className="pb-2">
                            <CardTitle>Total Assessments</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">
                                {assessments.length}
                            </div>
                            <p className="text-muted-foreground">assessments completed</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white/50 backdrop-blur-sm border-none">
                        <CardHeader className="pb-2">
                            <CardTitle>Average Score</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">
                                {Math.round(
                                    assessments.reduce((acc, curr) => acc + curr.overallScore, 0) /
                                    assessments.length
                                )}%
                            </div>
                            <p className="text-muted-foreground">across all assessments</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white/50 backdrop-blur-sm border-none">
                        <CardHeader className="pb-2">
                            <CardTitle>Friends Assessed</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">
                                {new Set(assessments.map(a => a.friendName)).size}
                            </div>
                            <p className="text-muted-foreground">unique friends</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <AnimatePresence mode="wait">
                    {selectedView === 'cards' && (
                        <motion.div
                            key="cards"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {filteredAssessments.map((assessment, index) => (
                                <motion.div
                                    key={assessment.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card className="bg-white/50 backdrop-blur-sm border-none hover:bg-white/60 transition-colors">
                                        <CardHeader>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <CardTitle className="text-xl">
                                                        {assessment.friendName}
                                                    </CardTitle>
                                                    <CardDescription>
                                                        {format(new Date(assessment.date), 'PPP')}
                                                    </CardDescription>
                                                </div>
                                                <ScoreIndicator score={assessment.overallScore} />
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground mb-4">
                                                {assessment.assessment.message}
                                            </p>
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleDelete(assessment.id)}
                                                >
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    className="gap-2"
                                                    onClick={() => router.push(`/results/${assessment.id}`)}
                                                >
                                                    View Details
                                                    <ArrowRight className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {selectedView === 'table' && (
                        <motion.div
                            key="table"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Card className="bg-white/50 backdrop-blur-sm border-none">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Friend</TableHead>
                                            <TableHead>Score</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredAssessments.map((assessment) => (
                                            <TableRow key={assessment.id}>
                                                <TableCell>
                                                    {format(new Date(assessment.date), 'PPP')}
                                                </TableCell>
                                                <TableCell>{assessment.friendName}</TableCell>
                                                <TableCell>
                                                    <ScoreIndicator score={assessment.overallScore} />
                                                </TableCell>
                                                <TableCell>{assessment.assessment.message}</TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button
                                                                variant="default"
                                                                size="sm"
                                                                className="gap-2 bg-primary text-white hover:bg-primary/90"
                                                                >
                                                                <Settings className="h-4 w-4" />
                                                                Actions
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent>
                                                            <DropdownMenuItem
                                                                className="gap-2 cursor-pointer"
                                                                onClick={() => router.push(`/results/${assessment.id}`)}
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                                View Details
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                className="gap-2 cursor-pointer text-red-600 focus:text-red-600"
                                                                onClick={() => handleDelete(assessment.id)}
                                                            >
                                                                <Trash className="h-4 w-4" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                                </TableRow>
                                                ))}
                                        </TableBody>
                                    </Table>
                                </Card>
                            </motion.div>
                        )
                    }

                    {selectedView === 'charts' && (
                        <motion.div
                            key="charts"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-8"
                        >
                            {/* Trend Chart */}
                            <Card className="bg-white/50 backdrop-blur-sm border-none">
                                <CardHeader>
                                    <CardTitle>Score Trend</CardTitle>
                                    <CardDescription>View your assessment scores over time</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <RechartsLineChart data={trendData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="date" />
                                                <YAxis domain={[0, 100]} />
                                                <Tooltip
                                                    content={({ active, payload, label }) => {
                                                        if (active && payload && payload.length) {
                                                            return (
                                                                <div className="bg-white p-4 rounded-lg shadow-lg border">
                                                                    <p className="font-bold">{label}</p>
                                                                    <p className="text-primary">{`Score: ${payload[0].value}%`}</p>
                                                                    <p className="text-sm text-muted-foreground">{`Friend: ${payload[0].payload.friend}`}</p>
                                                                </div>
                                                            );
                                                        }
                                                        return null;
                                                    }}
                                                />
                                                <Legend />
                                                <Line
                                                    type="monotone"
                                                    dataKey="score"
                                                    name="Assessment Score"
                                                    stroke="#3b82f6"
                                                    strokeWidth={2}
                                                    dot={{ r: 4 }}
                                                    activeDot={{ r: 8 }}
                                                />
                                            </RechartsLineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Average Scores by Friend */}
                            <Card className="bg-white/50 backdrop-blur-sm border-none">
                                <CardHeader>
                                    <CardTitle>Average Scores by Friend</CardTitle>
                                    <CardDescription>Compare average scores across different friends</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={averagesData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="friend" />
                                                <YAxis domain={[0, 100]} />
                                                <Tooltip
                                                    content={({ active, payload, label }) => {
                                                        if (active && payload && payload.length) {
                                                            return (
                                                                <div className="bg-white p-4 rounded-lg shadow-lg border">
                                                                    <p className="font-bold">{label}</p>
                                                                    <p className="text-primary">{`Average: ${payload[0].value}%`}</p>
                                                                </div>
                                                            );
                                                        }
                                                        return null;
                                                    }}
                                                />
                                                <Legend />
                                                <Bar
                                                    dataKey="average"
                                                    name="Average Score"
                                                    fill="#3b82f6"
                                                    radius={[4, 4, 0, 0]}
                                                />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Clear History Dialog */}
                <Dialog open={showClearDialog} onOpenChange={setShowClearDialog}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Clear History</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to clear all assessment history? This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setShowClearDialog(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={() => {
                                    clearHistory()
                                    setShowClearDialog(false)
                                }}
                            >
                                Clear History
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Delete Assessment Dialog */}
                <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete Assessment</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete this assessment? This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setShowDeleteDialog(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={confirmDelete}
                            >
                                Delete
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
