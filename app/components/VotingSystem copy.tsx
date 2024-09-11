'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface VoteOption {
  personA: string
  personB: string
  theme: string
}

interface VoteCount {
  [key: string]: number
}

const personAOptions = ['松本人志', '明石家さんま', '西川きよし', 'David']
const personBOptions = ['Bob', 'David']
const themeOptions = ['Music', 'Sports', 'Movies', 'Books']

export default function VotingSystem() {
  const [selectedVote, setSelectedVote] = useState<VoteOption>({
    personA: '',
    personB: '',
    theme: ''
  })
  const [voteCount, setVoteCount] = useState<VoteCount>({})

  const handleVote = () => {
    if (selectedVote.personA && selectedVote.personB && selectedVote.theme) {
      const voteKey = `${selectedVote.personA}-${selectedVote.personB}-${selectedVote.theme}`
      setVoteCount(prevCount => ({
        ...prevCount,
        [voteKey]: (prevCount[voteKey] || 0) + 1
      }))
      setSelectedVote({ personA: '', personB: '', theme: '' })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">投票システム</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>投票する</CardTitle>
          <CardDescription>Person A、Person B、Themeを選択してください</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select
            value={selectedVote.personA}
            onValueChange={(value) => setSelectedVote(prev => ({ ...prev, personA: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Person A を選択" />
            </SelectTrigger>
            <SelectContent>
              {personAOptions.map(person => (
                <SelectItem key={person} value={person}>{person}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={selectedVote.personB}
            onValueChange={(value) => setSelectedVote(prev => ({ ...prev, personB: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Person B を選択" />
            </SelectTrigger>
            <SelectContent>
              {personBOptions.map(person => (
                <SelectItem key={person} value={person}>{person}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={selectedVote.theme}
            onValueChange={(value) => setSelectedVote(prev => ({ ...prev, theme: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Theme を選択" />
            </SelectTrigger>
            <SelectContent>
              {themeOptions.map(theme => (
                <SelectItem key={theme} value={theme}>{theme}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button 
            onClick={handleVote}
            disabled={!selectedVote.personA || !selectedVote.personB || !selectedVote.theme}
          >
            投票する
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>投票結果</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {Object.entries(voteCount).map(([key, count]) => {
              const [personA, personB, theme] = key.split('-')
              return (
                <li key={key} className="flex justify-between items-center">
                  <span>{`${personA} と ${personB} の ${theme}`}</span>
                  <span className="font-bold">{count} 票</span>
                </li>
              )
            })}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
