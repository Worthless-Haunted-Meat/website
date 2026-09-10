---
title: "Terrified by a Function"
author: "Ricardo Vega"
date: "2026-09-09"
series: "Pass the Echo On"
part: 1
excerpt: "A piece of software wrote a function better than I could, and I sat there genuinely frightened."
---

# Terrified by a Function

*By Ricardo Vega*

---

About eighteen months ago a piece of software wrote a function better than I could, and I sat there genuinely frightened.

This was Windsurf, before I moved to Cursor. Ordinary task, something at work I'd have knocked out in twenty minutes. It produced it in seconds and it was better than mine. Cleaner. Handled a case I'd probably have caught on the second pass.

I want to be precise about the feeling, because I don't think people admit to it. It wasn't excitement about productivity. It was the floor going. Thirty years. Six or eight languages, depending on how you count. Three decades learning to say things correctly to a compiler that punished me brutally for a misplaced semicolon — and a machine had just done the thing I was paid for, faster, on a Tuesday afternoon.

I chewed on it for a few days. And what I came out with is the most useful thing I've realised in my career.

Nobody was ever paying me for the syntax.

They were paying me to know how the pieces fit. To hear a business problem in a meeting and see a shape. To know that this bit needs a queue, that bit falls over at scale, this other thing looks urgent and isn't. The typing was the tax I paid to express that knowledge. Thirty years of hard-won syntax was never the asset. It was the toll booth.

And the toll booth came down.

So my job didn't disappear, it got clarified. I'm paid to solve problems, and the distance between seeing the shape and having it running is now minutes instead of days. That's the thing I always wanted and had made peace with never having.

But — and here's where the funny part starts, if you find failure funny, which I've had to learn to.

Realising that and being good at it are completely different animals. I went from terrified to evangelical in about a week, then spent a year being spectacularly bad at the new skill.

Because it is a skill, and that's what both camps miss — the doomers who think the machine does everything, and the enthusiasts who think you just ask nicely. It's a craft with its own subtleties, and like every craft you learn it by being awful at it in public for a while.

Let me tell you about my favourite failure mode. I call it coding yourself into a corner, and I have been doing it for thirty years. AI didn't invent it. AI put it on rocket fuel.

The old version went like this. You pick a technology. It's a reasonable choice on Monday. You build for two weeks, and somewhere in week three you discover the thing cannot do what you need it to do — not won't, can't, architecturally. You've built a five-storey house on a plot that supports two.

And here's the trap: you're smart. You can make it work. You bolt on a workaround, then a workaround for the workaround, and it stands up, because clever people can always make bad foundations stand up. That's the actual danger of being good at this. Competence keeps you on a doomed path long after the ground has told you.

Eventually you give in and start over. And every single time — I have never once found an exception — the rewrite is faster, cleaner, and better than the original. You know the shape of the problem now. Two weeks becomes two days.

Now speed it up by two orders of magnitude and watch what changes.

What used to take months takes minutes, which sounds like pure gain until you notice what else got faster. You can now be a week down the wrong path by Tuesday lunchtime. You've generated so much so quickly that abandoning it feels enormous, even though it cost you an afternoon. Sunk cost used to be earned over weeks; now you can accumulate it before your coffee's cold, and your gut hasn't recalibrated.

Worse: the model agrees with you. You've committed to a direction, and you ask questions shaped by that commitment, and it answers the question you asked. It will help you build the fifth storey. Enthusiastically. In minutes. It won't say "the foundation is wrong" unless you ask something that lets it — and pride is very good at not asking that question. The warning signs are all there, same as they always were, and now they scroll past faster than you can read them.

So you lose days. Not to the technology being wrong — you'd have survived that — but to not admitting the technology was wrong, because admitting it means throwing away work that felt expensive and was actually cheap.

Here's the flip, and it's the hard lesson.

If the rewrite was always better, and the rewrite now costs hours instead of weeks, then you should be rewriting constantly. Not once, grudgingly, at the end. Five times. Because the fifth one is golden — it always was, we just could never afford to find out.

That's genuinely difficult to internalise. Every instinct three decades of scarcity built in me says protect the work, defend the choice, make it work. Those instincts were correct when code was expensive. Code isn't expensive anymore. The expensive thing is being wrong about the shape and refusing to notice.

The discipline now isn't building carefully. It's noticing early and being willing to bin it — and the emotional labour of throwing away four hundred lines you generated ten minutes ago is far harder than it should be, given they took ten minutes.

My other failures are more ordinary. Architectures that were beautiful and wrong. Code I accepted without reading, then debugged for two days over something I'd have caught in twelve seconds by looking. A data model that made sense in the conversation and none in a database. Asking confidently for the wrong thing and receiving exactly that — which stings most, because the machine did nothing wrong. I hadn't understood my own problem, and now I had four hundred lines proving it.

Every one taught something specific. When to let it run and when to hold the reins. That output quality mirrors how clearly you understand the problem — an unforgiving instrument for a man who likes to believe he understands his problems. That review is now the job, and typing never was.

You can't get that from a blog post. You get it the way you got everything else: doing it badly, noticing, adjusting. Same as when you were nineteen and your first program crashed. The awkwardness isn't a sign you're doing it wrong. It's the shape of learning anything.

So, plainly enough to annoy some of you: the syntax is dead. Not dying. The specific knowledge of expressing an idea correctly in a particular language — what most of us built our identity and our salary on — is a commodity now. Being the person who knows the language deeply is worth about what being the fastest typist was worth in 1995.

What's alive is everything the syntax was in the way of. Knowing what to build. Seeing how the pieces fit. Judging whether what's in front of you is right — which requires all thirty of those years, so none of it was wasted. It stopped being the product and became the instrument.

The companies that accept this will leave the rest behind. Not through better tools — everyone has the same tools. Because their people stopped defending the toll booth.

I nearly didn't. I sat in that chair convinced I was finished. What actually happened is that the least interesting part of my expertise became free, and the most interesting part became the whole job.

The failures keep coming. They're more interesting failures than they used to be, which is the only definition of progress I trust.
