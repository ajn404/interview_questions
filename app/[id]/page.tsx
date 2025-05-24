'use client'

import * as React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookOpen, Clock, Code, FileText, MessageSquare, Star, ThumbsUp } from 'lucide-react'

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

function InterviewQuestionDetail({
  title,
  questionType,
  difficulty,
  category,
  tags,
  description,
  examples,
  constraints,
  solution,
  hints,
  answer,
  analysis,
  followUps,
  resources,
  relatedQuestions,
}: InterviewQuestionProps) {
  return (
    <div className="container mx-auto py-6 max-w-5xl">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Star className="mr-2 h-4 w-4" />
                收藏
              </Button>
              <Button variant="outline" size="sm">
                <ThumbsUp className="mr-2 h-4 w-4" />
                点赞
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant={
                difficulty === 'easy'
                  ? 'secondary'
                  : difficulty === 'medium'
                    ? 'default'
                    : 'destructive'
              }
            >
              {difficulty === 'easy' ? '简单' : difficulty === 'medium' ? '中等' : '困难'}
            </Badge>
            <Badge variant="secondary">{category}</Badge>
            {tags?.map((tag) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
        </div>

        <Card className="p-6">
          <Tabs defaultValue="description">
            <TabsList className="mb-4">
              <TabsTrigger value="description">
                <FileText className="mr-2 h-4 w-4" />
                题目描述
              </TabsTrigger>
              {questionType === 'algorithm' ? (
                <TabsTrigger value="solution">
                  <Code className="mr-2 h-4 w-4" />
                  题解
                </TabsTrigger>
              ) : (
                <TabsTrigger value="answer">
                  <Code className="mr-2 h-4 w-4" />
                  参考答案
                </TabsTrigger>
              )}
              <TabsTrigger value="discussion">
                <MessageSquare className="mr-2 h-4 w-4" />
                讨论
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="space-y-6">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p>{description}</p>
              </div>
              {questionType === 'algorithm' && examples && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">示例</h3>
                  {examples.map((example, index) => (
                    <div key={index} className="space-y-2 rounded-lg border p-4">
                      <div>
                        <span className="font-medium">输入：</span>
                        <pre className="mt-2 rounded-md bg-muted p-4 overflow-x-auto">
                          <code>{example.input}</code>
                        </pre>
                      </div>
                      <div>
                        <span className="font-medium">输出：</span>
                        <pre className="mt-2 rounded-md bg-muted p-4 overflow-x-auto">
                          <code>{example.output}</code>
                        </pre>
                      </div>
                      {example.explanation && (
                        <div>
                          <span className="font-medium">解释：</span>
                          <p className="mt-1">{example.explanation}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {questionType === 'algorithm' && constraints && (
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">约束条件</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {constraints.map((constraint, index) => (
                      <li key={index}>{constraint}</li>
                    ))}
                  </ul>
                </div>
              )}
              {questionType !== 'algorithm' && answer && (
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">参考答案</h3>
                  <div className="rounded-lg border p-4">{answer}</div>
                </div>
              )}
              {analysis && (
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">解析</h3>
                  <div className="rounded-lg border p-4">{analysis}</div>
                </div>
              )}
              {followUps && followUps.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">追问</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {followUps.map((item, idx) => <li key={idx}>{item}</li>)}
                  </ul>
                </div>
              )}
              {resources && resources.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">参考资料</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {resources.map((res, idx) => (
                      <li key={idx}>
                        <a href={res.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{res.name}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="solution" className="space-y-6">
              {solution ? (
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <h3 className="text-lg font-medium">解题思路</h3>
                  <p>{solution}</p>
                  <pre className="mt-4 rounded-md bg-muted p-4 overflow-x-auto">
                    <code>{`// 代码实现示例\nfunction solution(input) {\n  // 实现逻辑\n  return output;\n}`}</code>
                  </pre>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">暂无题解</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    题解正在编写中，请稍后查看
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="discussion" className="space-y-6">
              <div className="flex flex-col items-center justify-center py-12">
                <MessageSquare className="h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">参与讨论</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  分享你的解题思路和见解
                </p>
                <Button className="mt-4">发表评论</Button>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
        
        {relatedQuestions && relatedQuestions.length > 0 && (
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">相关题目</h3>
            <div className="space-y-2">
              {relatedQuestions.map((question) => (
                <div key={question.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted">
                  <div className="flex items-center">
                    <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{question.title}</span>
                  </div>
                  <Button variant="ghost" size="sm">查看</Button>
                </div>
              ))}
            </div>
          </Card>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1 h-4 w-4" />
            <span>最近更新: 2023-06-15</span>
          </div>
          <Button variant="outline" size="sm">
            报告问题
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function InterviewQuestionDetailPage() {
  const questionData: InterviewQuestionProps = {
    title: "两数之和",
    questionType: "algorithm",
    difficulty: "easy",
    category: "数组",
    tags: ["哈希表", "查找"],
    description: "给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出和为目标值 target 的那两个整数，并返回它们的数组下标。你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。你可以按任意顺序返回答案。",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "因为 nums[0] + nums[1] == 9 ，返回 [0, 1]"
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]"
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]"
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "只会存在一个有效答案"
    ],
    solution: "我们可以使用哈希表来解决这个问题，通过一次遍历数组，对于每个元素，我们检查哈希表中是否存在目标值减去当前元素的值。如果存在，我们找到了答案；如果不存在，我们将当前元素及其索引添加到哈希表中。这种方法的时间复杂度为 O(n)，空间复杂度也为 O(n)。",
    hints: [
      "尝试使用哈希表来优化查找过程",
      "对于每个元素 x，检查是否存在 target - x"
    ],
    answer: "答案：[0, 1]",
    analysis: "分析：使用哈希表来解决这个问题，通过一次遍历数组，对于每个元素，我们检查哈希表中是否存在目标值减去当前元素的值。如果存在，我们找到了答案；如果不存在，我们将当前元素及其索引添加到哈希表中。这种方法的时间复杂度为 O(n)，空间复杂度也为 O(n)。",
    followUps: [
      "如果数组中存在重复元素，如何处理？",
      "如果数组中存在负数，如何处理？"
    ],
    resources: [
      { name: "LeetCode", url: "https://leetcode.com/" },
      { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/" }
    ],
    relatedQuestions: [
      {
        id: "1",
        title: "三数之和"
      },
      {
        id: "2",
        title: "四数之和"
      },
      {
        id: "3",
        title: "两数之和 II - 输入有序数组"
      }
    ]
  }

  return <InterviewQuestionDetail {...questionData} />
} 