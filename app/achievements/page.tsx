'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAchievementStore } from '@/lib/gamification/achievement-store';
import { useHistoryStore } from '@/lib/history-store';
import { getRarityConfig, getCategoryConfig, Achievement } from '@/lib/gamification/achievements';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Lock, Trophy, ArrowRight, Filter } from 'lucide-react';
import GEOHead from '@/components/GEOHead';
import { LottieAnimation } from '@/components/LottieAnimation';
import { format } from 'date-fns';

export default function AchievementsPage() {
    const router = useRouter();
    const { assessments } = useHistoryStore();
    const {
        getUnlockedAchievements,
        getLockedAchievements,
        getProgress,
        checkAndUnlockAchievements
    } = useAchievementStore();

    const [mounted, setMounted] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedRarity, setSelectedRarity] = useState<string>('all');

    useEffect(() => {
        setMounted(true);
        // Check for new achievements on mount
        checkAndUnlockAchievements(assessments);
    }, [assessments, checkAndUnlockAchievements]);

    if (!mounted) return null;

    const unlockedAchievements = getUnlockedAchievements();
    const lockedAchievements = getLockedAchievements();
    const progress = getProgress();

    // Filter achievements
    const filterAchievements = (achievements: Achievement[]) => {
        return achievements.filter(a => {
            const categoryMatch = selectedCategory === 'all' || a.category === selectedCategory;
            const rarityMatch = selectedRarity === 'all' || a.rarity === selectedRarity;
            return categoryMatch && rarityMatch;
        });
    };

    const filteredUnlocked = filterAchievements(unlockedAchievements);
    const filteredLocked = filterAchievements(lockedAchievements);

    // Achievement Card Component
    const AchievementCard = ({ achievement, isUnlocked }: { achievement: Achievement; isUnlocked: boolean }) => {
        const rarityConfig = getRarityConfig(achievement.rarity);
        const categoryConfig = getCategoryConfig(achievement.category);
        const Icon = achievement.icon;

        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                className="relative"
            >
                <Card className={`
                    border-2 transition-all duration-300
                    ${isUnlocked
                        ? 'bg-white/80 backdrop-blur-sm border-primary/50 hover:border-primary'
                        : 'bg-gray-50/50 border-gray-200 hover:border-gray-300'
                    }
                `}>
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div className={`
                                w-16 h-16 rounded-xl flex items-center justify-center mb-4
                                ${isUnlocked
                                    ? `bg-gradient-to-br ${achievement.color}`
                                    : 'bg-gray-200'
                                }
                            `}>
                                {isUnlocked ? (
                                    <Icon className="w-8 h-8 text-white" />
                                ) : (
                                    <Lock className="w-8 h-8 text-gray-400" />
                                )}
                            </div>
                            <div className="flex flex-col gap-2 items-end">
                                <Badge className={`${rarityConfig.bg} ${rarityConfig.color}`}>
                                    {rarityConfig.label}
                                </Badge>
                                <Badge variant="outline" className={categoryConfig.color}>
                                    {categoryConfig.label}
                                </Badge>
                            </div>
                        </div>
                        <CardTitle className={isUnlocked ? '' : 'text-gray-400'}>
                            {achievement.name}
                        </CardTitle>
                        <CardDescription className={isUnlocked ? '' : 'text-gray-400'}>
                            {achievement.description}
                        </CardDescription>
                    </CardHeader>
                    {isUnlocked && achievement.unlockedAt && (
                        <CardContent>
                            <div className="text-sm text-muted-foreground">
                                Unlocked on {format(new Date(achievement.unlockedAt), 'PPP')}
                            </div>
                        </CardContent>
                    )}
                </Card>

                {/* Shine effect for unlocked */}
                {isUnlocked && (
                    <motion.div
                        className="absolute inset-0 rounded-lg pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: [0, 0.3, 0],
                            background: [
                                'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.8) 50%, transparent 70%)',
                                'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.8) 50%, transparent 70%)'
                            ]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3
                        }}
                    />
                )}
            </motion.div>
        );
    };

    // Empty state
    if (assessments.length === 0) {
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
                            <h2 className="text-3xl font-bold mb-4">Start Your Journey</h2>
                            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                                Complete assessments to unlock achievements and track your progress!
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
                        <div className="flex items-center gap-3 mb-4">
                            <Trophy className="h-10 w-10 text-yellow-500" />
                            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                                Achievements
                            </h1>
                        </div>
                        <p className="text-xl text-muted-foreground mb-6">
                            Track your progress and unlock badges
                        </p>

                        {/* Progress Overview */}
                        <Card className="bg-white/50 backdrop-blur-sm border-none">
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Overall Progress</p>
                                            <p className="text-2xl font-bold">
                                                {progress.unlocked} / {progress.total}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-muted-foreground">Completion</p>
                                            <p className="text-2xl font-bold text-primary">
                                                {progress.percentage}%
                                            </p>
                                        </div>
                                    </div>
                                    <Progress value={progress.percentage} className="h-3" />
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-6"
                    >
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2">
                                <Filter className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">Filters:</span>
                            </div>

                            {/* Category Filter */}
                            <div className="flex gap-2">
                                {['all', 'milestone', 'quality', 'diversity', 'improvement', 'dedication'].map(cat => (
                                    <Button
                                        key={cat}
                                        variant={selectedCategory === cat ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => setSelectedCategory(cat)}
                                    >
                                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                    </Button>
                                ))}
                            </div>

                            {/* Rarity Filter */}
                            <div className="flex gap-2">
                                {['all', 'common', 'rare', 'epic', 'legendary'].map(rar => (
                                    <Button
                                        key={rar}
                                        variant={selectedRarity === rar ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => setSelectedRarity(rar)}
                                    >
                                        {rar.charAt(0).toUpperCase() + rar.slice(1)}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Achievement Tabs */}
                    <Tabs defaultValue="unlocked" className="w-full">
                        <TabsList className="grid w-full max-w-md grid-cols-2">
                            <TabsTrigger value="unlocked">
                                Unlocked ({filteredUnlocked.length})
                            </TabsTrigger>
                            <TabsTrigger value="locked">
                                Locked ({filteredLocked.length})
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="unlocked" className="mt-6">
                            <AnimatePresence mode="wait">
                                {filteredUnlocked.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {filteredUnlocked.map((achievement, index) => (
                                            <motion.div
                                                key={achievement.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                            >
                                                <AchievementCard achievement={achievement} isUnlocked={true} />
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-center py-12"
                                    >
                                        <p className="text-muted-foreground">No unlocked achievements match your filters</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </TabsContent>

                        <TabsContent value="locked" className="mt-6">
                            <AnimatePresence mode="wait">
                                {filteredLocked.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {filteredLocked.map((achievement, index) => (
                                            <motion.div
                                                key={achievement.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                            >
                                                <AchievementCard achievement={achievement} isUnlocked={false} />
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-center py-12"
                                    >
                                        <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                                        <p className="text-xl font-bold mb-2">All Achievements Unlocked!</p>
                                        <p className="text-muted-foreground">You've completed everything. Congratulations!</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    );
}
