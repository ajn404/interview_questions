"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
    BookOpen,
    BrainCircuit,
    Code,
    Database,
    FileCode,
    Filter,
    Layers,
    ListFilter,
    Network,
    Search,
    Server,
    Sparkles,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface InterviewQuestion {
    id: string;
    title: string;
    category: string;
    difficulty: "Easy" | "Medium" | "Hard";
    tags: string[];
}

interface CategoryOption {
    value: string;
    label: string;
    icon: React.ReactNode;
    description?: string;
}

const categories: CategoryOption[] = [
    {
        value: "algorithms",
        label: "算法与数据结构",
        icon: <BrainCircuit className="h-4 w-4" />,
        description: "包含常见算法问题和数据结构应用",
    },
    {
        value: "frontend",
        label: "前端开发",
        icon: <Code className="h-4 w-4" />,
        description: "HTML, CSS, JavaScript, React等前端技术",
    },
    {
        value: "backend",
        label: "后端开发",
        icon: <Server className="h-4 w-4" />,
        description: "服务器端开发、API设计与实现",
    },
    {
        value: "database",
        label: "数据库",
        icon: <Database className="h-4 w-4" />,
        description: "SQL, NoSQL数据库设计与优化",
    },
    {
        value: "system-design",
        label: "系统设计",
        icon: <Network className="h-4 w-4" />,
        description: "大型系统架构设计与分布式系统",
    },
    {
        value: "devops",
        label: "DevOps",
        icon: <Layers className="h-4 w-4" />,
        description: "CI/CD, 容器化, 云服务等",
    },
    {
        value: "machine-learning",
        label: "机器学习",
        icon: <Sparkles className="h-4 w-4" />,
        description: "AI与机器学习相关问题",
    },
    {
        value: "behavioral",
        label: "行为面试",
        icon: <BookOpen className="h-4 w-4" />,
        description: "软技能与行为问题",
    },
];

const difficultyOptions = [
    { value: "Easy", label: "简单", color: "bg-green-500" },
    { value: "Medium", label: "中等", color: "bg-yellow-500" },
    { value: "Hard", label: "困难", color: "bg-red-500" },
];

const mockQuestions: InterviewQuestion[] = [
    {
        id: "1",
        title: "两数之和",
        category: "algorithms",
        difficulty: "Easy",
        tags: ["数组", "哈希表"],
    },
    {
        id: "2",
        title: "实现防抖函数",
        category: "frontend",
        difficulty: "Medium",
        tags: ["JavaScript", "函数式编程"],
    },
    {
        id: "3",
        title: "设计一个分布式缓存系统",
        category: "system-design",
        difficulty: "Hard",
        tags: ["缓存", "分布式系统"],
    },
    {
        id: "4",
        title: "SQL索引优化",
        category: "database",
        difficulty: "Medium",
        tags: ["SQL", "性能优化"],
    },
    {
        id: "5",
        title: "React Hooks原理",
        category: "frontend",
        difficulty: "Hard",
        tags: ["React", "Hooks"],
    },
    {
        id: "6",
        title: "Docker容器编排",
        category: "devops",
        difficulty: "Medium",
        tags: ["Docker", "Kubernetes"],
    },
];

const MenuPage = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
        null
    );
    const [searchQuery, setSearchQuery] = useState("");
    const [openCategoryFilter, setOpenCategoryFilter] = useState(false);
    const [openDifficultyFilter, setOpenDifficultyFilter] = useState(false);

    const filteredQuestions = mockQuestions.filter((question) => {
        const matchesCategory = selectedCategory
            ? question.category === selectedCategory
            : true;
        const matchesDifficulty = selectedDifficulty
            ? question.difficulty === selectedDifficulty
            : true;
        const matchesSearch = searchQuery
            ? question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            question.tags.some((tag) =>
                tag.toLowerCase().includes(searchQuery.toLowerCase())
            )
            : true;

        return matchesCategory && matchesDifficulty && matchesSearch;
    });

    const getCategoryIcon = (categoryValue: string) => {
        const category = categories.find((c) => c.value === categoryValue);
        return category?.icon || <FileCode className="h-4 w-4" />;
    };

    const getDifficultyBadge = (difficulty: string) => {
        const option = difficultyOptions.find((d) => d.value === difficulty);
        return (
            <span
                className={cn(
                    "inline-flex h-2 w-2 rounded-full",
                    option?.color || "bg-gray-500"
                )}
            />
        );
    };

    return (
        <div className="container mx-auto py-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">面试题集锦</h1>
                <p className="text-muted-foreground">
                    浏览各类技术面试题，提升面试准备效率
                </p>
            </div>

            <div className="flex flex-col space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                            type="search"
                            placeholder="搜索面试题或标签..."
                            className="w-full rounded-md border border-input bg-background py-2 pl-8 pr-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <Popover
                            open={openCategoryFilter}
                            onOpenChange={setOpenCategoryFilter}
                        >
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-9 gap-1.5 text-sm"
                                >
                                    <ListFilter className="h-3.5 w-3.5" />
                                    {selectedCategory
                                        ? categories.find((c) => c.value === selectedCategory)?.label
                                        : "分类筛选"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[220px] p-0" align="end">
                                <Command>
                                    <CommandInput placeholder="搜索分类..." />
                                    <CommandList>
                                        <CommandEmpty>未找到相关分类</CommandEmpty>
                                        <CommandGroup>
                                            {categories.map((category) => (
                                                <CommandItem
                                                    key={category.value}
                                                    value={category.value}
                                                    onSelect={(value) => {
                                                        setSelectedCategory(
                                                            selectedCategory === value ? null : value
                                                        );
                                                        setOpenCategoryFilter(false);
                                                    }}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        {category.icon}
                                                        <span>{category.label}</span>
                                                    </div>
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>

                        <Popover
                            open={openDifficultyFilter}
                            onOpenChange={setOpenDifficultyFilter}
                        >
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-9 gap-1.5 text-sm"
                                >
                                    <Filter className="h-3.5 w-3.5" />
                                    {selectedDifficulty
                                        ? difficultyOptions.find(
                                            (d) => d.value === selectedDifficulty
                                        )?.label
                                        : "难度筛选"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[180px] p-0" align="end">
                                <Command>
                                    <CommandList>
                                        <CommandGroup>
                                            {difficultyOptions.map((difficulty) => (
                                                <CommandItem
                                                    key={difficulty.value}
                                                    value={difficulty.value}
                                                    onSelect={(value) => {
                                                        setSelectedDifficulty(
                                                            selectedDifficulty === value ? null : value
                                                        );
                                                        setOpenDifficultyFilter(false);
                                                    }}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <span
                                                            className={cn(
                                                                "inline-flex h-2 w-2 rounded-full",
                                                                difficulty.color
                                                            )}
                                                        />
                                                        <span>{difficulty.label}</span>
                                                    </div>
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>

                        {(selectedCategory || selectedDifficulty) && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-9"
                                onClick={() => {
                                    setSelectedCategory(null);
                                    setSelectedDifficulty(null);
                                }}
                            >
                                清除筛选
                            </Button>
                        )}
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredQuestions.map((question) => (
                        <Card key={question.id} className="overflow-hidden">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        {getCategoryIcon(question.category)}
                                        <span className="text-xs text-muted-foreground">
                                            {
                                                categories.find((c) => c.value === question.category)
                                                    ?.label
                                            }
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        {getDifficultyBadge(question.difficulty)}
                                        <span className="text-xs text-muted-foreground">
                                            {
                                                difficultyOptions.find(
                                                    (d) => d.value === question.difficulty
                                                )?.label
                                            }
                                        </span>
                                    </div>
                                </div>
                                <CardTitle className="text-lg">{question.title}</CardTitle>
                                <CardDescription>
                                    {question.tags.map((tag, index) => (
                                        <React.Fragment key={tag}>
                                            <span className="text-xs">{tag}</span>
                                            {index < question.tags.length - 1 && (
                                                <span className="mx-1 text-xs">•</span>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Link href={`/menu/${question.id}`}>
                                    <Button variant="outline" size="sm" className="w-full">
                                        查看详情
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredQuestions.length === 0 && (
                    <div className="flex h-[200px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
                        <div className="text-muted-foreground">未找到匹配的面试题</div>
                        <Button
                            variant="link"
                            className="mt-2"
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedCategory(null);
                                setSelectedDifficulty(null);
                            }}
                        >
                            清除所有筛选条件
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MenuPage;