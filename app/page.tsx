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
    FileText,
    MessageSquare,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface InterviewQuestionProps {
    title: string
    questionType: 'algorithm' | 'business' | 'theory' | 'system-design' | 'database' | 'frontend' | 'devops' | 'machine-learning' | 'behavioral'
    difficulty?: 'easy' | 'medium' | 'hard'
    category?: string
    tags?: string[]
    description: string
    examples?: {
        input: string
        output: string
        explanation?: string
    }[]
    constraints?: string[]
    solution?: string
    hints?: string[]
    answer?: string
    analysis?: string
    followUps?: string[]
    resources?: { name: string; url: string }[]
    relatedQuestions?: {
        id: string
        title: string
    }[]
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

const mockQuestions: InterviewQuestionProps[] = [
    {
        title: "两数之和",
        questionType: "algorithm",
        difficulty: "easy",
        category: "algorithms",
        tags: ["数组", "哈希表"],
        description: "给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出和为目标值的那两个整数，并返回它们的数组下标。",
        examples: [
            { input: "[2,7,11,15]", output: "[0,1]", explanation: "因为 nums[0] + nums[1] == 9，所以返回 [0, 1]。" },
            { input: "[3,2,4]", output: "[1,2]", explanation: "因为 nums[1] + nums[2] == 6，所以返回 [1, 2]。" },
            { input: "[3,3]", output: "[0,1]", explanation: "因为 nums[0] + nums[1] == 6，所以返回 [0, 1]。" },
        ],
        constraints: ["2 <= nums.length <= 10^3", "-10^9 <= nums[i] <= 10^9", "-10^9 <= target <= 10^9"],
        solution: "使用哈希表来存储数组中的元素及其索引。遍历数组，对于每个元素，计算其与目标值的差值，并检查该差值是否已经存在于哈希表中。如果存在，则返回当前元素和差值对应的索引；如果不存在，则将当前元素及其索引添加到哈希表中。",
        hints: ["考虑使用哈希表来存储数组中的元素及其索引。"],
        answer: "[0,1]",
        analysis: "该问题的时间复杂度为 O(n)，空间复杂度为 O(n)。哈希表的查找操作是常数时间复杂度的，因此该算法是高效的。",
        followUps: ["如果数组中存在重复元素，如何处理？"],
        resources: [
            { name: "LeetCode 两数之和", url: "https://leetcode.com/problems/two-sum/" },
            { name: "力扣官方题解", url: "https://leetcode.cn/problems/two-sum/solution/" },
        ],
        relatedQuestions: [
            { id: "1", title: "实现防抖函数" },
            { id: "3", title: "设计一个分布式缓存系统" },
        ],
    },
    {
        title: "实现防抖函数",
        questionType: "algorithm",
        difficulty: "medium",
        category: "frontend",
        tags: ["JavaScript", "函数式编程"],
        description: "实现一个防抖函数，用于限制函数在一定时间内的执行次数。",
        examples: [
            { input: "function debounce(func, wait) { ... }", output: "function debounce(func, wait) { ... }" },
        ],
        constraints: ["1 <= wait <= 1000", "1 <= func.length <= 5"],
        solution: "使用闭包和setTimeout来实现防抖函数。在每次函数调用时，清除之前的定时器，并设置一个新的定时器来延迟执行函数。",
        hints: ["考虑使用闭包和setTimeout来实现防抖函数。"],
        answer: "function debounce(func, wait) { ... }",
        analysis: "该问题的时间复杂度为 O(n)，空间复杂度为 O(n)。防抖函数通过清除之前的定时器来限制函数的执行次数。",
        followUps: ["如果需要立即执行一次，应该如何修改防抖函数？"],
        resources: [
            { name: "JavaScript 防抖函数", url: "https://www.freecodecamp.org/news/javascript-debounce-function/" },
            { name: "力扣官方题解", url: "https://leetcode.cn/problems/implement-debounce/" },
        ],
        relatedQuestions: [
            { id: "1", title: "两数之和" },
            { id: "3", title: "设计一个分布式缓存系统" },
        ],
    },
    {
        title: "设计一个分布式缓存系统",
        questionType: "system-design",
        difficulty: "hard",
        category: "system-design",
        tags: ["缓存", "分布式系统"],
        description: "设计一个分布式缓存系统，考虑高可用性、一致性和扩展性。",
        examples: [
            { input: "分布式缓存系统的设计", output: "分布式缓存系统的设计" },
        ],
        constraints: ["系统需要支持高并发访问", "数据一致性要求高", "系统需要支持大规模扩展"],
        solution: "设计一个分布式缓存系统，包括缓存服务器、分布式存储和一致性协议。使用一致性哈希算法来分配缓存服务器，使用分布式存储来存储数据，使用一致性协议来保证数据一致性。",
        hints: ["考虑使用一致性哈希算法来分配缓存服务器。"],
        answer: "分布式缓存系统的设计",
        analysis: "该问题的时间复杂度为 O(n)，空间复杂度为 O(n)。分布式缓存系统通过一致性哈希算法和分布式存储来保证高可用性、一致性和扩展性。",
        followUps: ["如果需要支持更多的缓存服务器，应该如何扩展系统？"],
        resources: [
            { name: "分布式缓存系统设计", url: "https://www.freecodecamp.org/news/distributed-caching-system-design/" },
            { name: "力扣官方题解", url: "https://leetcode.cn/problems/design-distributed-cache/" },
        ],
        relatedQuestions: [
            { id: "1", title: "两数之和" },
            { id: "2", title: "实现防抖函数" },
        ],
    },
    {
        title: "SQL索引优化",
        questionType: "database",
        difficulty: "medium",
        category: "database",
        tags: ["SQL", "性能优化"],
        description: "如何优化SQL查询性能，提高数据库访问速度。",
        examples: [
            { input: "SELECT * FROM users WHERE age > 30", output: "SELECT * FROM users WHERE age > 30" },
        ],
        constraints: ["SQL查询性能优化", "数据库访问速度提高"],
        solution: "使用索引、优化查询语句和数据库配置来提高SQL查询性能。",
        hints: ["考虑使用索引、优化查询语句和数据库配置来提高SQL查询性能。"],
        answer: "SELECT * FROM users WHERE age > 30",
        analysis: "该问题的时间复杂度为 O(n)，空间复杂度为 O(n)。通过使用索引、优化查询语句和数据库配置来提高SQL查询性能。",
        followUps: ["如果需要优化更多的SQL查询，应该如何处理？"],
        resources: [
            { name: "SQL索引优化", url: "https://www.freecodecamp.org/news/sql-index-optimization/" },
            { name: "力扣官方题解", url: "https://leetcode.cn/problems/optimize-sql-queries/" },
        ],
        relatedQuestions: [
            { id: "3", title: "设计一个分布式缓存系统" },
        ],
    },
    {
        title: "React Hooks原理",
        questionType: "frontend",
        difficulty: "hard",
        category: "frontend",
        tags: ["React", "Hooks"],
        description: "React Hooks的原理和使用方法。",
        examples: [
            { input: "React Hooks的原理", output: "React Hooks的原理" },
        ],
        constraints: ["理解React Hooks的原理", "掌握React Hooks的使用方法"],
        solution: "React Hooks的原理是通过函数组件和状态管理来实现组件逻辑复用和状态管理。",
        hints: ["考虑使用函数组件和状态管理来实现组件逻辑复用和状态管理。"],
        answer: "React Hooks的原理",
        analysis: "该问题的时间复杂度为 O(n)，空间复杂度为 O(n)。通过函数组件和状态管理来实现组件逻辑复用和状态管理。",
        followUps: ["如果需要实现更多的React Hooks，应该如何处理？"],
        resources: [
            { name: "React Hooks原理", url: "https://www.freecodecamp.org/news/react-hooks-tutorial/" },
            { name: "力扣官方题解", url: "https://leetcode.cn/problems/react-hooks-principles/" },
        ],
        relatedQuestions: [
            { id: "1", title: "两数之和" },
            { id: "5", title: "Docker容器编排" },
        ],
    },
    {
        title: "Docker容器编排",
        questionType: "devops",
        difficulty: "medium",
        category: "devops",
        tags: ["Docker", "Kubernetes"],
        description: "Docker容器编排和Kubernetes的使用方法。",
        examples: [
            { input: "Docker容器编排", output: "Docker容器编排" },
        ],
        constraints: ["理解Docker容器编排和Kubernetes的使用方法", "掌握Docker和Kubernetes的基本操作"],
        solution: "Docker容器编排和Kubernetes的使用方法是通过Docker和Kubernetes来管理和调度容器。",
        hints: ["考虑使用Docker和Kubernetes来管理和调度容器。"],
        answer: "Docker容器编排",
        analysis: "该问题的时间复杂度为 O(n)，空间复杂度为 O(n)。通过Docker和Kubernetes来管理和调度容器。",
        followUps: ["如果需要实现更多的容器编排工具，应该如何处理？"],
        resources: [
            { name: "Docker容器编排", url: "https://www.freecodecamp.org/news/docker-container-orchestration/" },
            { name: "力扣官方题解", url: "https://leetcode.cn/problems/docker-container-orchestration/" },
        ],
        relatedQuestions: [
            { id: "1", title: "两数之和" },
            { id: "5", title: "React Hooks原理" },
        ],
    },
    {
        title: "请简述微服务架构的优缺点",
        questionType: "theory",
        description: "请结合实际项目经验，简要说明微服务架构的主要优点和缺点。",
        answer: "优点包括：易于扩展、技术栈灵活、独立部署、容错性好等。缺点包括：分布式复杂性高、运维成本增加、数据一致性难度大等。",
        analysis: "微服务适合大型复杂系统，但对团队协作、自动化运维、服务治理等提出更高要求。",
        followUps: ["请举例说明你在项目中遇到的微服务拆分难点。"],
        resources: [
            { name: "微服务架构设计模式", url: "https://martinfowler.com/microservices/" }
        ]
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
            question.tags?.some((tag) =>
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
                        <Card key={question.title} className="overflow-hidden">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        {getCategoryIcon(question.category || "")}
                                        <span className="text-xs text-muted-foreground">
                                            {
                                                categories.find((c) => c.value === question.category)
                                                    ?.label
                                            }
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        {getDifficultyBadge(question.difficulty || "")}
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
                                    {(question.tags ?? []).map((tag, index) => (
                                        <React.Fragment key={tag}>
                                            <span className="text-xs">{tag}</span>
                                            {index < (question.tags?.length ?? 0) - 1 && (
                                                <span className="mx-1 text-xs">•</span>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Link href={`/${question.title.replace(/\s+/g, '-').toLowerCase()}`}>
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