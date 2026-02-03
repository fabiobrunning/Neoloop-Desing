# Motion Design System - Neoloop Design System

**Document Version:** 1.0.0
**Last Updated:** 2026-01-31
**Status:** Phase 4 - Motion & Interaction
**Owner:** UX Design Expert

---

## Table of Contents

1. [Introduction](#introduction)
2. [Motion Design Principles](#motion-design-principles)
3. [Animation System](#animation-system)
4. [Timing & Easing](#timing--easing)
5. [Microinteractions](#microinteractions)
6. [Page Transitions](#page-transitions)
7. [Gesture Animations](#gesture-animations)
8. [Loading States](#loading-states)
9. [Accessibility in Motion](#accessibility-in-motion)
10. [Implementation Guidelines](#implementation-guidelines)
11. [Testing & QA](#testing--qa)
12. [Developer Handoff](#developer-handoff)

---

## Introduction

### Purpose

Motion design in Neoloop serves three core purposes:

1. **Inform** - Provide feedback and communicate system status
2. **Guide** - Direct user attention and suggest next actions
3. **Delight** - Create memorable, pleasant experiences

### Scope

This document defines 80+ animation specifications covering:
- UI microinteractions
- Page and component transitions
- Loading and feedback states
- Gesture-based animations
- Accessibility considerations

### Motion Philosophy

**Purposeful**: Every animation has a clear functional reason
**Performant**: 60fps minimum, optimized for all devices
**Respectful**: Honors user preferences (prefers-reduced-motion)
**Consistent**: Uses standardized timing and easing

---

## Motion Design Principles

### 1. Purpose Over Decoration

**DO:**
- Animate to provide feedback (button press)
- Animate to show causality (item added to cart)
- Animate to maintain context (page transition)

**DON'T:**
- Animate for aesthetic appeal alone
- Add motion that slows task completion
- Use animation to hide poor UX

### 2. Natural & Physical

Animations should feel grounded in real-world physics:

- **Gravity**: Elements fall naturally (ease-in)
- **Momentum**: Moving objects slow gradually (ease-out)
- **Elasticity**: Some elements have gentle bounce
- **Mass**: Larger elements move slower

### 3. Hierarchy of Motion

Not all elements should move equally:

**Primary**: Key user focus (modal opening) - prominent motion
**Secondary**: Supporting elements (backdrop fade) - subtle motion
**Tertiary**: Ambient elements (background) - minimal motion

### 4. Choreography

When multiple elements animate:

1. **Stagger**: Sequential motion creates flow
2. **Group**: Related items move together
3. **Lead**: One element guides others

### 5. Responsive Timing

Motion adapts to context:

| Context | Duration Modifier |
|---------|-------------------|
| Mobile (touch) | -20% (faster) |
| Desktop (click) | Base timing |
| Tablet | -10% |
| TV/Large screen | +10% (slower) |
| Reduced motion | 0ms or instant |

---

## Animation System

### Animation Token Architecture

```css
/* Base Duration Tokens */
--duration-instant: 0ms;
--duration-immediate: 100ms;
--duration-fast: 150ms;
--duration-base: 200ms;
--duration-moderate: 300ms;
--duration-slow: 400ms;
--duration-slower: 500ms;
--duration-slowest: 700ms;

/* Easing Tokens */
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-sharp: cubic-bezier(0.4, 0, 0.6, 1);
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-spring: cubic-bezier(0.5, 1.5, 0.5, 1);
--ease-overshoot: cubic-bezier(0.34, 1.2, 0.64, 1);

/* Delay Tokens */
--delay-none: 0ms;
--delay-short: 50ms;
--delay-medium: 100ms;
--delay-long: 150ms;

/* Stagger Tokens */
--stagger-children: 30ms;
--stagger-list: 40ms;
--stagger-grid: 50ms;
```

### Animation Presets (80+ Specifications)

#### CATEGORY 1: FADE ANIMATIONS (8 presets)

**1.1 Fade In**
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fadeIn var(--duration-base) var(--ease-out);
}
```
- **Use**: Page load, content reveal
- **Duration**: 200ms
- **Easing**: ease-out

**1.2 Fade Out**
```css
@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

.fade-out {
  animation: fadeOut var(--duration-fast) var(--ease-in);
}
```
- **Use**: Element removal, dismissal
- **Duration**: 150ms
- **Easing**: ease-in

**1.3 Fade In Up**
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp var(--duration-moderate) var(--ease-out);
}
```
- **Use**: Card entry, toast notifications
- **Duration**: 300ms
- **Easing**: ease-out

**1.4 Fade In Down**
```css
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-down {
  animation: fadeInDown var(--duration-moderate) var(--ease-out);
}
```
- **Use**: Dropdown menus, header elements
- **Duration**: 300ms
- **Easing**: ease-out

**1.5 Fade Out Up**
```css
@keyframes fadeOutUp {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
}

.fade-out-up {
  animation: fadeOutUp var(--duration-fast) var(--ease-in);
}
```
- **Use**: Toast dismissal
- **Duration**: 150ms
- **Easing**: ease-in

**1.6 Fade Out Down**
```css
@keyframes fadeOutDown {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
}

.fade-out-down {
  animation: fadeOutDown var(--duration-fast) var(--ease-in);
}
```
- **Use**: Menu collapse
- **Duration**: 150ms
- **Easing**: ease-in

**1.7 Fade In Left**
```css
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.fade-in-left {
  animation: fadeInLeft var(--duration-moderate) var(--ease-out);
}
```
- **Use**: Sidebar entry, drawer open
- **Duration**: 300ms
- **Easing**: ease-out

**1.8 Fade In Right**
```css
@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.fade-in-right {
  animation: fadeInRight var(--duration-moderate) var(--ease-out);
}
```
- **Use**: Panel entry, notifications
- **Duration**: 300ms
- **Easing**: ease-out

---

#### CATEGORY 2: SCALE ANIMATIONS (10 presets)

**2.1 Scale In**
```css
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.scale-in {
  animation: scaleIn var(--duration-moderate) var(--ease-out);
}
```
- **Use**: Modal entry, dialog open
- **Duration**: 300ms
- **Easing**: ease-out

**2.2 Scale Out**
```css
@keyframes scaleOut {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.9);
  }
}

.scale-out {
  animation: scaleOut var(--duration-fast) var(--ease-in);
}
```
- **Use**: Modal exit, dialog close
- **Duration**: 150ms
- **Easing**: ease-in

**2.3 Scale In Center**
```css
@keyframes scaleInCenter {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.scale-in-center {
  animation: scaleInCenter var(--duration-moderate) var(--ease-out);
  transform-origin: center;
}
```
- **Use**: FAB expand, badge entry
- **Duration**: 300ms
- **Easing**: ease-out

**2.4 Scale Bounce**
```css
@keyframes scaleBounce {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.scale-bounce {
  animation: scaleBounce var(--duration-moderate) var(--ease-bounce);
}
```
- **Use**: Button feedback, success states
- **Duration**: 300ms
- **Easing**: ease-bounce

**2.5 Scale Pulse**
```css
@keyframes scalePulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}

.scale-pulse {
  animation: scalePulse 2s var(--ease-in-out) infinite;
}
```
- **Use**: Attention grabber, notifications
- **Duration**: 2000ms (loop)
- **Easing**: ease-in-out

**2.6 Scale Up**
```css
@keyframes scaleUp {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05);
  }
}

.scale-up {
  animation: scaleUp var(--duration-fast) var(--ease-out) forwards;
}
```
- **Use**: Hover states, card highlight
- **Duration**: 150ms
- **Easing**: ease-out

**2.7 Scale Down**
```css
@keyframes scaleDown {
  from {
    transform: scale(1.05);
  }
  to {
    transform: scale(1);
  }
}

.scale-down {
  animation: scaleDown var(--duration-fast) var(--ease-in);
}
```
- **Use**: Hover exit, card return
- **Duration**: 150ms
- **Easing**: ease-in

**2.8 Scale In Up**
```css
@keyframes scaleInUp {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.scale-in-up {
  animation: scaleInUp var(--duration-moderate) var(--ease-out);
}
```
- **Use**: Popover entry, tooltip
- **Duration**: 300ms
- **Easing**: ease-out

**2.9 Scale Press**
```css
@keyframes scalePress {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}

.scale-press {
  animation: scalePress var(--duration-fast) var(--ease-in-out);
}
```
- **Use**: Button press feedback
- **Duration**: 150ms
- **Easing**: ease-in-out

**2.10 Scale Breathe**
```css
@keyframes scaleBreathe {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

.scale-breathe {
  animation: scaleBreathe 3s var(--ease-in-out) infinite;
}
```
- **Use**: Live indicators, recording states
- **Duration**: 3000ms (loop)
- **Easing**: ease-in-out

---

#### CATEGORY 3: SLIDE ANIMATIONS (12 presets)

**3.1 Slide In Up**
```css
@keyframes slideInUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.slide-in-up {
  animation: slideInUp var(--duration-moderate) var(--ease-out);
}
```
- **Use**: Bottom sheet, mobile drawer
- **Duration**: 300ms
- **Easing**: ease-out

**3.2 Slide Out Down**
```css
@keyframes slideOutDown {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
}

.slide-out-down {
  animation: slideOutDown var(--duration-moderate) var(--ease-in);
}
```
- **Use**: Bottom sheet dismiss
- **Duration**: 300ms
- **Easing**: ease-in

**3.3 Slide In Left**
```css
@keyframes slideInLeft {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

.slide-in-left {
  animation: slideInLeft var(--duration-moderate) var(--ease-out);
}
```
- **Use**: Side navigation, drawer
- **Duration**: 300ms
- **Easing**: ease-out

**3.4 Slide Out Left**
```css
@keyframes slideOutLeft {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

.slide-out-left {
  animation: slideOutLeft var(--duration-moderate) var(--ease-in);
}
```
- **Use**: Page exit (left swipe)
- **Duration**: 300ms
- **Easing**: ease-in

**3.5 Slide In Right**
```css
@keyframes slideInRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.slide-in-right {
  animation: slideInRight var(--duration-moderate) var(--ease-out);
}
```
- **Use**: Right panel, notifications
- **Duration**: 300ms
- **Easing**: ease-out

**3.6 Slide Out Right**
```css
@keyframes slideOutRight {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}

.slide-out-right {
  animation: slideOutRight var(--duration-moderate) var(--ease-in);
}
```
- **Use**: Panel dismiss, swipe away
- **Duration**: 300ms
- **Easing**: ease-in

**3.7 Slide In Down**
```css
@keyframes slideInDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

.slide-in-down {
  animation: slideInDown var(--duration-moderate) var(--ease-out);
}
```
- **Use**: Top banner, header reveal
- **Duration**: 300ms
- **Easing**: ease-out

**3.8 Slide Out Up**
```css
@keyframes slideOutUp {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
}

.slide-out-up {
  animation: slideOutUp var(--duration-moderate) var(--ease-in);
}
```
- **Use**: Header hide, banner dismiss
- **Duration**: 300ms
- **Easing**: ease-in

**3.9 Slide Fade In Up**
```css
@keyframes slideFadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-fade-in-up {
  animation: slideFadeInUp var(--duration-moderate) var(--ease-out);
}
```
- **Use**: List items, content blocks
- **Duration**: 300ms
- **Easing**: ease-out

**3.10 Slide Fade Out Up**
```css
@keyframes slideFadeOutUp {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-30px);
  }
}

.slide-fade-out-up {
  animation: slideFadeOutUp var(--duration-fast) var(--ease-in);
}
```
- **Use**: Item removal
- **Duration**: 150ms
- **Easing**: ease-in

**3.11 Slide Peek**
```css
@keyframes slidePeek {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-10px);
  }
  100% {
    transform: translateX(0);
  }
}

.slide-peek {
  animation: slidePeek var(--duration-moderate) var(--ease-in-out);
}
```
- **Use**: Swipeable hint, tutorial
- **Duration**: 300ms
- **Easing**: ease-in-out

**3.12 Slide Bounce In**
```css
@keyframes slideBounceIn {
  0% {
    transform: translateX(100%);
  }
  60% {
    transform: translateX(-5px);
  }
  80% {
    transform: translateX(2px);
  }
  100% {
    transform: translateX(0);
  }
}

.slide-bounce-in {
  animation: slideBounceIn var(--duration-slow) var(--ease-out);
}
```
- **Use**: Playful notifications
- **Duration**: 400ms
- **Easing**: ease-out

---

#### CATEGORY 4: ROTATE ANIMATIONS (6 presets)

**4.1 Rotate 180**
```css
@keyframes rotate180 {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
}

.rotate-180 {
  animation: rotate180 var(--duration-moderate) var(--ease-in-out);
}
```
- **Use**: Icon toggle (chevron, arrow)
- **Duration**: 300ms
- **Easing**: ease-in-out

**4.2 Rotate 360 Loop**
```css
@keyframes rotate360 {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.rotate-360-loop {
  animation: rotate360 1s linear infinite;
}
```
- **Use**: Loading spinner
- **Duration**: 1000ms (loop)
- **Easing**: linear

**4.3 Rotate Shake**
```css
@keyframes rotateShake {
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-5deg);
  }
  75% {
    transform: rotate(5deg);
  }
}

.rotate-shake {
  animation: rotateShake var(--duration-moderate) var(--ease-in-out);
}
```
- **Use**: Error feedback, attention
- **Duration**: 300ms
- **Easing**: ease-in-out

**4.4 Rotate Flip X**
```css
@keyframes rotateFlipX {
  from {
    transform: rotateX(0deg);
  }
  to {
    transform: rotateX(180deg);
  }
}

.rotate-flip-x {
  animation: rotateFlipX var(--duration-moderate) var(--ease-in-out);
}
```
- **Use**: Card flip, reveal content
- **Duration**: 300ms
- **Easing**: ease-in-out

**4.5 Rotate Flip Y**
```css
@keyframes rotateFlipY {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(180deg);
  }
}

.rotate-flip-y {
  animation: rotateFlipY var(--duration-moderate) var(--ease-in-out);
}
```
- **Use**: Card flip horizontal
- **Duration**: 300ms
- **Easing**: ease-in-out

**4.6 Rotate Wiggle**
```css
@keyframes rotateWiggle {
  0%, 100% {
    transform: rotate(0deg);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: rotate(-3deg);
  }
  20%, 40%, 60%, 80% {
    transform: rotate(3deg);
  }
}

.rotate-wiggle {
  animation: rotateWiggle var(--duration-slow) var(--ease-in-out);
}
```
- **Use**: Playful attention, bell icon
- **Duration**: 400ms
- **Easing**: ease-in-out

---

#### CATEGORY 5: BOUNCE ANIMATIONS (6 presets)

**5.1 Bounce In**
```css
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}

.bounce-in {
  animation: bounceIn var(--duration-slow) var(--ease-out);
}
```
- **Use**: Success message, celebration
- **Duration**: 400ms
- **Easing**: ease-out

**5.2 Bounce Out**
```css
@keyframes bounceOut {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.95);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
  100% {
    opacity: 0;
    transform: scale(0.3);
  }
}

.bounce-out {
  animation: bounceOut var(--duration-moderate) var(--ease-in);
}
```
- **Use**: Item removal with emphasis
- **Duration**: 300ms
- **Easing**: ease-in

**5.3 Bounce Loop**
```css
@keyframes bounceLoop {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.bounce-loop {
  animation: bounceLoop 2s ease-in-out infinite;
}
```
- **Use**: Call-to-action, scroll indicator
- **Duration**: 2000ms (loop)
- **Easing**: ease-in-out

**5.4 Bounce Up**
```css
@keyframes bounceUp {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0);
  }
}

.bounce-up {
  animation: bounceUp var(--duration-moderate) var(--ease-bounce);
}
```
- **Use**: Button press, like action
- **Duration**: 300ms
- **Easing**: ease-bounce

**5.5 Bounce Down**
```css
@keyframes bounceDown {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(15px);
  }
  100% {
    transform: translateY(0);
  }
}

.bounce-down {
  animation: bounceDown var(--duration-moderate) var(--ease-bounce);
}
```
- **Use**: Download action, drop feedback
- **Duration**: 300ms
- **Easing**: ease-bounce

**5.6 Bounce Attention**
```css
@keyframes bounceAttention {
  0%, 100% {
    transform: scale(1);
  }
  10%, 20% {
    transform: scale(0.9) rotate(-3deg);
  }
  30%, 50%, 70%, 90% {
    transform: scale(1.1) rotate(3deg);
  }
  40%, 60%, 80% {
    transform: scale(1.1) rotate(-3deg);
  }
}

.bounce-attention {
  animation: bounceAttention 1s ease-in-out;
}
```
- **Use**: Important notification
- **Duration**: 1000ms
- **Easing**: ease-in-out

---

#### CATEGORY 6: SHAKE ANIMATIONS (5 presets)

**6.1 Shake Horizontal**
```css
@keyframes shakeHorizontal {
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-5px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(5px);
  }
}

.shake-horizontal {
  animation: shakeHorizontal var(--duration-slow) var(--ease-in-out);
}
```
- **Use**: Invalid input, error feedback
- **Duration**: 400ms
- **Easing**: ease-in-out

**6.2 Shake Vertical**
```css
@keyframes shakeVertical {
  0%, 100% {
    transform: translateY(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateY(-5px);
  }
  20%, 40%, 60%, 80% {
    transform: translateY(5px);
  }
}

.shake-vertical {
  animation: shakeVertical var(--duration-slow) var(--ease-in-out);
}
```
- **Use**: Attention grabber
- **Duration**: 400ms
- **Easing**: ease-in-out

**6.3 Shake Slight**
```css
@keyframes shakeSlight {
  0%, 100% {
    transform: translateX(0);
  }
  25%, 75% {
    transform: translateX(-2px);
  }
  50% {
    transform: translateX(2px);
  }
}

.shake-slight {
  animation: shakeSlight var(--duration-base) var(--ease-in-out);
}
```
- **Use**: Subtle error, gentle feedback
- **Duration**: 200ms
- **Easing**: ease-in-out

**6.4 Shake Hard**
```css
@keyframes shakeHard {
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-10px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(10px);
  }
}

.shake-hard {
  animation: shakeHard var(--duration-slow) var(--ease-in-out);
}
```
- **Use**: Critical error, urgent attention
- **Duration**: 400ms
- **Easing**: ease-in-out

**6.5 Shake Crazy**
```css
@keyframes shakeCrazy {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  10% {
    transform: translate(-5px, -5px) rotate(-1deg);
  }
  20% {
    transform: translate(5px, 5px) rotate(1deg);
  }
  30% {
    transform: translate(-5px, 5px) rotate(-1deg);
  }
  40% {
    transform: translate(5px, -5px) rotate(1deg);
  }
  50% {
    transform: translate(-5px, -5px) rotate(-1deg);
  }
  60% {
    transform: translate(5px, 5px) rotate(1deg);
  }
  70% {
    transform: translate(-5px, 5px) rotate(-1deg);
  }
  80% {
    transform: translate(5px, -5px) rotate(1deg);
  }
  90% {
    transform: translate(-5px, -5px) rotate(-1deg);
  }
}

.shake-crazy {
  animation: shakeCrazy var(--duration-slower) var(--ease-in-out);
}
```
- **Use**: Major error, system alert
- **Duration**: 500ms
- **Easing**: ease-in-out

---

#### CATEGORY 7: EXPAND/COLLAPSE ANIMATIONS (6 presets)

**7.1 Expand Height**
```css
@keyframes expandHeight {
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 1000px;
    opacity: 1;
  }
}

.expand-height {
  animation: expandHeight var(--duration-moderate) var(--ease-out);
  overflow: hidden;
}
```
- **Use**: Accordion expand, dropdown
- **Duration**: 300ms
- **Easing**: ease-out

**7.2 Collapse Height**
```css
@keyframes collapseHeight {
  from {
    max-height: 1000px;
    opacity: 1;
  }
  to {
    max-height: 0;
    opacity: 0;
  }
}

.collapse-height {
  animation: collapseHeight var(--duration-moderate) var(--ease-in);
  overflow: hidden;
}
```
- **Use**: Accordion collapse
- **Duration**: 300ms
- **Easing**: ease-in

**7.3 Expand Width**
```css
@keyframes expandWidth {
  from {
    max-width: 0;
    opacity: 0;
  }
  to {
    max-width: 500px;
    opacity: 1;
  }
}

.expand-width {
  animation: expandWidth var(--duration-moderate) var(--ease-out);
  overflow: hidden;
}
```
- **Use**: Sidebar expand, panel reveal
- **Duration**: 300ms
- **Easing**: ease-out

**7.4 Collapse Width**
```css
@keyframes collapseWidth {
  from {
    max-width: 500px;
    opacity: 1;
  }
  to {
    max-width: 0;
    opacity: 0;
  }
}

.collapse-width {
  animation: collapseWidth var(--duration-moderate) var(--ease-in);
  overflow: hidden;
}
```
- **Use**: Sidebar collapse
- **Duration**: 300ms
- **Easing**: ease-in

**7.5 Expand Center**
```css
@keyframes expandCenter {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.expand-center {
  animation: expandCenter var(--duration-moderate) var(--ease-overshoot);
}
```
- **Use**: FAB menu expand, radial menu
- **Duration**: 300ms
- **Easing**: ease-overshoot

**7.6 Collapse Center**
```css
@keyframes collapseCenter {
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0);
    opacity: 0;
  }
}

.collapse-center {
  animation: collapseCenter var(--duration-fast) var(--ease-in);
}
```
- **Use**: FAB menu collapse
- **Duration**: 150ms
- **Easing**: ease-in

---

#### CATEGORY 8: FLIP ANIMATIONS (4 presets)

**8.1 Flip Horizontal**
```css
@keyframes flipHorizontal {
  from {
    transform: perspective(400px) rotateY(0);
  }
  to {
    transform: perspective(400px) rotateY(180deg);
  }
}

.flip-horizontal {
  animation: flipHorizontal var(--duration-slow) var(--ease-in-out);
  backface-visibility: hidden;
}
```
- **Use**: Card flip, reveal back
- **Duration**: 400ms
- **Easing**: ease-in-out

**8.2 Flip Vertical**
```css
@keyframes flipVertical {
  from {
    transform: perspective(400px) rotateX(0);
  }
  to {
    transform: perspective(400px) rotateX(180deg);
  }
}

.flip-vertical {
  animation: flipVertical var(--duration-slow) var(--ease-in-out);
  backface-visibility: hidden;
}
```
- **Use**: Card flip vertical
- **Duration**: 400ms
- **Easing**: ease-in-out

**8.3 Flip In X**
```css
@keyframes flipInX {
  from {
    transform: perspective(400px) rotateX(90deg);
    opacity: 0;
  }
  to {
    transform: perspective(400px) rotateX(0);
    opacity: 1;
  }
}

.flip-in-x {
  animation: flipInX var(--duration-moderate) var(--ease-out);
  backface-visibility: visible;
}
```
- **Use**: Content reveal
- **Duration**: 300ms
- **Easing**: ease-out

**8.4 Flip In Y**
```css
@keyframes flipInY {
  from {
    transform: perspective(400px) rotateY(90deg);
    opacity: 0;
  }
  to {
    transform: perspective(400px) rotateY(0);
    opacity: 1;
  }
}

.flip-in-y {
  animation: flipInY var(--duration-moderate) var(--ease-out);
  backface-visibility: visible;
}
```
- **Use**: Panel entry
- **Duration**: 300ms
- **Easing**: ease-out

---

#### CATEGORY 9: GLOW/HIGHLIGHT ANIMATIONS (5 presets)

**9.1 Glow Pulse**
```css
@keyframes glowPulse {
  0%, 100% {
    box-shadow: 0 0 5px rgba(var(--color-primary-rgb), 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(var(--color-primary-rgb), 0.8);
  }
}

.glow-pulse {
  animation: glowPulse 2s ease-in-out infinite;
}
```
- **Use**: Live status, active element
- **Duration**: 2000ms (loop)
- **Easing**: ease-in-out

**9.2 Highlight Flash**
```css
@keyframes highlightFlash {
  0% {
    background-color: transparent;
  }
  50% {
    background-color: var(--color-primary-100);
  }
  100% {
    background-color: transparent;
  }
}

.highlight-flash {
  animation: highlightFlash var(--duration-slower) var(--ease-in-out);
}
```
- **Use**: New content, updated row
- **Duration**: 500ms
- **Easing**: ease-in-out

**9.3 Border Glow**
```css
@keyframes borderGlow {
  0%, 100% {
    border-color: var(--color-border);
  }
  50% {
    border-color: var(--color-primary);
    box-shadow: 0 0 10px var(--color-primary);
  }
}

.border-glow {
  animation: borderGlow 2s ease-in-out infinite;
}
```
- **Use**: Focus state, active input
- **Duration**: 2000ms (loop)
- **Easing**: ease-in-out

**9.4 Text Glow**
```css
@keyframes textGlow {
  0%, 100% {
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
  }
  50% {
    text-shadow: 0 0 15px rgba(255, 255, 255, 0.7);
  }
}

.text-glow {
  animation: textGlow 2s ease-in-out infinite;
}
```
- **Use**: Premium feature, special text
- **Duration**: 2000ms (loop)
- **Easing**: ease-in-out

**9.5 Ripple Effect**
```css
@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}

.ripple {
  animation: ripple var(--duration-slow) var(--ease-out);
}
```
- **Use**: Button click feedback (Material Design)
- **Duration**: 400ms
- **Easing**: ease-out

---

#### CATEGORY 10: LOADING ANIMATIONS (8 presets)

**10.1 Spinner**
```css
@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.spinner {
  animation: spinner 1s linear infinite;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
}
```
- **Use**: General loading
- **Duration**: 1000ms (loop)
- **Easing**: linear

**10.2 Dots Pulse**
```css
@keyframes dotsPulse {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.dots-pulse {
  animation: dotsPulse 1.4s ease-in-out infinite;
}

.dots-pulse:nth-child(2) {
  animation-delay: 0.2s;
}

.dots-pulse:nth-child(3) {
  animation-delay: 0.4s;
}
```
- **Use**: Loading dots, typing indicator
- **Duration**: 1400ms (loop)
- **Easing**: ease-in-out

**10.3 Progress Bar**
```css
@keyframes progressBar {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.progress-bar {
  animation: progressBar 1.5s ease-in-out infinite;
}
```
- **Use**: Indeterminate progress
- **Duration**: 1500ms (loop)
- **Easing**: ease-in-out

**10.4 Skeleton Shimmer**
```css
@keyframes skeletonShimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.skeleton-shimmer {
  animation: skeletonShimmer 1.5s ease-in-out infinite;
  background: linear-gradient(
    90deg,
    var(--color-gray-200) 25%,
    var(--color-gray-100) 50%,
    var(--color-gray-200) 75%
  );
  background-size: 200% 100%;
}
```
- **Use**: Content placeholder, skeleton screen
- **Duration**: 1500ms (loop)
- **Easing**: ease-in-out

**10.5 Pulse Grow**
```css
@keyframes pulseGrow {
  0%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
}

.pulse-grow {
  animation: pulseGrow 1.5s ease-in-out infinite;
}
```
- **Use**: Loading indicator, waiting state
- **Duration**: 1500ms (loop)
- **Easing**: ease-in-out

**10.6 Bounce Dots**
```css
@keyframes bounceDots {
  0%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
}

.bounce-dots {
  animation: bounceDots 1.4s ease-in-out infinite;
}

.bounce-dots:nth-child(2) {
  animation-delay: 0.2s;
}

.bounce-dots:nth-child(3) {
  animation-delay: 0.4s;
}
```
- **Use**: Playful loading
- **Duration**: 1400ms (loop)
- **Easing**: ease-in-out

**10.7 Circular Progress**
```css
@keyframes circularProgress {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 100, 200;
    stroke-dashoffset: -15;
  }
  100% {
    stroke-dasharray: 100, 200;
    stroke-dashoffset: -125;
  }
}

.circular-progress {
  animation: circularProgress 1.5s ease-in-out infinite;
}
```
- **Use**: Circular loader (SVG)
- **Duration**: 1500ms (loop)
- **Easing**: ease-in-out

**10.8 Typing Indicator**
```css
@keyframes typingIndicator {
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-8px);
  }
}

.typing-indicator {
  animation: typingIndicator 1.4s ease-in-out infinite;
}

.typing-indicator:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator:nth-child(3) {
  animation-delay: 0.4s;
}
```
- **Use**: Chat typing indicator
- **Duration**: 1400ms (loop)
- **Easing**: ease-in-out

---

#### CATEGORY 11: ATTENTION SEEKERS (5 presets)

**11.1 Heartbeat**
```css
@keyframes heartbeat {
  0%, 100% {
    transform: scale(1);
  }
  10%, 30% {
    transform: scale(0.9);
  }
  20%, 40% {
    transform: scale(1.1);
  }
}

.heartbeat {
  animation: heartbeat 1.3s ease-in-out infinite;
}
```
- **Use**: Like action, favorite
- **Duration**: 1300ms (loop)
- **Easing**: ease-in-out

**11.2 Tada**
```css
@keyframes tada {
  0%, 100% {
    transform: scale(1) rotate(0);
  }
  10%, 20% {
    transform: scale(0.9) rotate(-3deg);
  }
  30%, 50%, 70%, 90% {
    transform: scale(1.1) rotate(3deg);
  }
  40%, 60%, 80% {
    transform: scale(1.1) rotate(-3deg);
  }
}

.tada {
  animation: tada 1s ease-in-out;
}
```
- **Use**: Achievement unlocked
- **Duration**: 1000ms
- **Easing**: ease-in-out

**11.3 Swing**
```css
@keyframes swing {
  20% {
    transform: rotate(15deg);
  }
  40% {
    transform: rotate(-10deg);
  }
  60% {
    transform: rotate(5deg);
  }
  80% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.swing {
  animation: swing 1s ease-in-out;
  transform-origin: top center;
}
```
- **Use**: Notification, alert
- **Duration**: 1000ms
- **Easing**: ease-in-out

**11.4 Jello**
```css
@keyframes jello {
  0%, 100% {
    transform: skewX(0deg) skewY(0deg);
  }
  30% {
    transform: skewX(25deg) skewY(25deg);
  }
  40% {
    transform: skewX(-15deg) skewY(-15deg);
  }
  50% {
    transform: skewX(15deg) skewY(15deg);
  }
  65% {
    transform: skewX(-5deg) skewY(-5deg);
  }
  75% {
    transform: skewX(5deg) skewY(5deg);
  }
}

.jello {
  animation: jello 1s ease-in-out;
}
```
- **Use**: Fun interaction, playful feedback
- **Duration**: 1000ms
- **Easing**: ease-in-out

**11.5 Flash**
```css
@keyframes flash {
  0%, 50%, 100% {
    opacity: 1;
  }
  25%, 75% {
    opacity: 0;
  }
}

.flash {
  animation: flash 1s ease-in-out;
}
```
- **Use**: Urgent attention, alert
- **Duration**: 1000ms
- **Easing**: ease-in-out

---

#### CATEGORY 12: STAGGER PATTERNS (6 presets)

**12.1 List Stagger**
```css
.list-stagger > * {
  animation: fadeInUp var(--duration-moderate) var(--ease-out) both;
}

.list-stagger > *:nth-child(1) { animation-delay: 0ms; }
.list-stagger > *:nth-child(2) { animation-delay: 40ms; }
.list-stagger > *:nth-child(3) { animation-delay: 80ms; }
.list-stagger > *:nth-child(4) { animation-delay: 120ms; }
.list-stagger > *:nth-child(5) { animation-delay: 160ms; }
/* Continue for more items */
```
- **Use**: List reveal, menu items
- **Delay**: 40ms per item
- **Animation**: fadeInUp

**12.2 Grid Stagger**
```css
.grid-stagger > * {
  animation: scaleIn var(--duration-moderate) var(--ease-out) both;
}

/* Calculate delay based on grid position */
.grid-stagger > *:nth-child(1) { animation-delay: 0ms; }
.grid-stagger > *:nth-child(2) { animation-delay: 50ms; }
.grid-stagger > *:nth-child(3) { animation-delay: 100ms; }
.grid-stagger > *:nth-child(4) { animation-delay: 50ms; }
.grid-stagger > *:nth-child(5) { animation-delay: 100ms; }
.grid-stagger > *:nth-child(6) { animation-delay: 150ms; }
/* Diagonal pattern */
```
- **Use**: Card grid, image gallery
- **Delay**: 50ms diagonal pattern
- **Animation**: scaleIn

**12.3 Cascade Left**
```css
.cascade-left > * {
  animation: fadeInLeft var(--duration-moderate) var(--ease-out) both;
}

.cascade-left > *:nth-child(n) {
  animation-delay: calc(var(--stagger-children) * var(--index));
}
```
- **Use**: Navigation items, sidebar
- **Delay**: 30ms per item
- **Animation**: fadeInLeft

**12.4 Cascade Right**
```css
.cascade-right > * {
  animation: fadeInRight var(--duration-moderate) var(--ease-out) both;
}

.cascade-right > *:nth-child(n) {
  animation-delay: calc(var(--stagger-children) * var(--index));
}
```
- **Use**: Timeline, notifications
- **Delay**: 30ms per item
- **Animation**: fadeInRight

**12.5 Radial Stagger**
```css
.radial-stagger > * {
  animation: scaleIn var(--duration-moderate) var(--ease-overshoot) both;
}

/* Fan out from center */
.radial-stagger > *:nth-child(1) { animation-delay: 0ms; }
.radial-stagger > *:nth-child(2) { animation-delay: 60ms; }
.radial-stagger > *:nth-child(3) { animation-delay: 60ms; }
.radial-stagger > *:nth-child(4) { animation-delay: 120ms; }
.radial-stagger > *:nth-child(5) { animation-delay: 120ms; }
```
- **Use**: FAB menu, radial menu
- **Delay**: Symmetric from center
- **Animation**: scaleIn

**12.6 Wave Stagger**
```css
.wave-stagger > * {
  animation: bounceUp var(--duration-moderate) var(--ease-in-out) both;
}

/* Wave effect */
.wave-stagger > *:nth-child(n) {
  animation-delay: calc(var(--stagger-children) * var(--index));
}
```
- **Use**: Letter animation, playful reveal
- **Delay**: 30ms per item
- **Animation**: bounceUp

---

## Timing & Easing

### Duration Guidelines

| Duration | Value | Use Case | Examples |
|----------|-------|----------|----------|
| **Instant** | 0ms | Reduced motion | All animations when `prefers-reduced-motion` |
| **Immediate** | 100ms | Micro-feedback | Tooltip show, checkbox check |
| **Fast** | 150ms | Quick transitions | Hover states, button press |
| **Base** | 200ms | Default | Fade in/out, simple transitions |
| **Moderate** | 300ms | Standard animations | Slide, scale, most interactions |
| **Slow** | 400ms | Emphasized motion | Complex transitions, modals |
| **Slower** | 500ms | Deliberate | Page transitions, major state changes |
| **Slowest** | 700ms | Entertainment | Celebration animations |

### Duration Rules

**By Interaction Type:**
- **Hover/Focus**: 150ms (fast response)
- **Click/Tap**: 200ms (immediate feedback)
- **Page transitions**: 300-500ms (maintain context)
- **Loading states**: 1000-2000ms (loops)
- **Celebrations**: 500-1000ms (one-time)

**By Element Size:**
- **Small (icons, badges)**: -50ms modifier
- **Medium (buttons, cards)**: Base timing
- **Large (modals, panels)**: +100ms modifier
- **Full screen**: +200ms modifier

**By Distance Traveled:**
- **0-50px**: Base duration
- **51-200px**: +50ms
- **201-500px**: +100ms
- **500px+**: +150ms

### Easing Curves

**Linear** (`linear`)
```
Speed: ━━━━━━━━━━
Use: Rotation, color changes, constant motion
```

**Ease-In** (`cubic-bezier(0.4, 0, 1, 1)`)
```
Speed: ━━━━━━━━━━▶▶▶
Use: Exit animations, elements leaving viewport
Metaphor: Falling, accelerating
```

**Ease-Out** (`cubic-bezier(0, 0, 0.2, 1)`)
```
Speed: ▶▶▶━━━━━━━━━━
Use: Enter animations, elements entering viewport
Metaphor: Car braking, decelerating
```

**Ease-In-Out** (`cubic-bezier(0.4, 0, 0.2, 1)`)
```
Speed: ━━▶▶▶▶━━
Use: Transitions, moving within viewport
Metaphor: Natural movement
```

**Sharp** (`cubic-bezier(0.4, 0, 0.6, 1)`)
```
Speed: ━━▶▶▶━
Use: Quick, decisive movements
Metaphor: Snappy response
```

**Bounce** (`cubic-bezier(0.34, 1.56, 0.64, 1)`)
```
Speed: ━━▶▶↗↘━
Use: Playful interactions, success states
Metaphor: Ball bouncing
```

**Spring** (`cubic-bezier(0.5, 1.5, 0.5, 1)`)
```
Speed: ━━▶↗↘▶━
Use: Elastic interactions, drawer open
Metaphor: Spring stretching
```

**Overshoot** (`cubic-bezier(0.34, 1.2, 0.64, 1)`)
```
Speed: ━━▶▶↗━
Use: Gentle bounce, soft landing
Metaphor: Soft cushion
```

### Easing Selection Matrix

| Animation Type | Direction | Recommended Easing | Reason |
|----------------|-----------|-------------------|---------|
| Fade | In | ease-out | Decelerate into view |
| Fade | Out | ease-in | Accelerate out of view |
| Scale | In | ease-out | Gentle appearance |
| Scale | Out | ease-in | Quick disappearance |
| Slide | In | ease-out | Smooth entrance |
| Slide | Out | ease-in | Quick exit |
| Bounce | Any | bounce | Playful effect |
| Rotate | Toggle | ease-in-out | Symmetric motion |
| Modal | Open | ease-out | Comfortable reveal |
| Modal | Close | ease-in | Fast dismissal |
| Drawer | Open | spring | Natural pull |
| Drawer | Close | ease-in | Quick push |

---

## Microinteractions

### Button Interactions

**Primary Button Press**
```css
.button-primary {
  transition: all var(--duration-fast) var(--ease-out);
}

.button-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.button-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.button-primary:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  animation: pulseGlow 1s ease-in-out;
}
```

**Icon Button Feedback**
```css
.icon-button {
  transition: transform var(--duration-fast) var(--ease-out);
}

.icon-button:hover {
  transform: scale(1.1);
}

.icon-button:active {
  animation: scalePress var(--duration-fast);
}
```

**Toggle Button**
```css
.toggle-button input:checked ~ .toggle-slider {
  animation: slideRight var(--duration-base) var(--ease-out);
}

.toggle-button input:not(:checked) ~ .toggle-slider {
  animation: slideLeft var(--duration-base) var(--ease-out);
}
```

### Form Interactions

**Input Focus**
```css
.input-field {
  transition: border-color var(--duration-base) var(--ease-out),
              box-shadow var(--duration-base) var(--ease-out);
}

.input-field:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-alpha-20);
}
```

**Input Success**
```css
.input-field.success {
  animation: highlightFlash var(--duration-slower) var(--ease-in-out),
             borderGlow var(--duration-moderate) var(--ease-out);
  border-color: var(--color-success);
}
```

**Input Error**
```css
.input-field.error {
  animation: shakeHorizontal var(--duration-slow) var(--ease-in-out);
  border-color: var(--color-error);
}

.input-field.error ~ .error-message {
  animation: fadeInDown var(--duration-moderate) var(--ease-out);
}
```

**Checkbox Check**
```css
.checkbox input:checked ~ .checkmark {
  animation: scaleIn var(--duration-base) var(--ease-overshoot);
}

.checkbox input:checked ~ .checkmark::after {
  animation: fadeIn var(--duration-fast) var(--ease-out) 100ms both;
}
```

**Radio Select**
```css
.radio input:checked ~ .radio-mark::after {
  animation: scaleIn var(--duration-base) var(--ease-bounce);
}
```

**Select Dropdown**
```css
.select-dropdown {
  animation: fadeInDown var(--duration-moderate) var(--ease-out);
  transform-origin: top;
}

.select-dropdown.closing {
  animation: fadeOutUp var(--duration-fast) var(--ease-in);
}
```

### Link & Navigation

**Link Hover**
```css
.link {
  position: relative;
  transition: color var(--duration-fast) var(--ease-out);
}

.link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: currentColor;
  transition: width var(--duration-base) var(--ease-out);
}

.link:hover::after {
  width: 100%;
}
```

**Breadcrumb Separator**
```css
.breadcrumb-separator {
  animation: fadeIn var(--duration-base) var(--ease-out);
}
```

**Tab Switch**
```css
.tab-panel {
  animation: fadeIn var(--duration-moderate) var(--ease-out);
}

.tab-indicator {
  transition: transform var(--duration-moderate) var(--ease-out);
}
```

### Card Interactions

**Card Hover**
```css
.card {
  transition: transform var(--duration-base) var(--ease-out),
              box-shadow var(--duration-base) var(--ease-out);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}
```

**Card Flip**
```css
.card-flip {
  animation: flipHorizontal var(--duration-slow) var(--ease-in-out);
}
```

**Card Expand**
```css
.card-expand {
  animation: scaleIn var(--duration-moderate) var(--ease-overshoot);
}
```

### Icon Interactions

**Icon Spin**
```css
.icon-spin {
  animation: rotate360 var(--duration-slower) linear infinite;
}
```

**Icon Bounce**
```css
.icon-bounce {
  animation: bounceUp var(--duration-moderate) var(--ease-bounce);
}
```

**Icon Pulse**
```css
.icon-pulse {
  animation: scalePulse 2s var(--ease-in-out) infinite;
}
```

**Chevron Toggle**
```css
.chevron-toggle {
  transition: transform var(--duration-moderate) var(--ease-in-out);
}

.chevron-toggle.expanded {
  transform: rotate(180deg);
}
```

### Badge & Notification

**Badge Entry**
```css
.badge {
  animation: scaleInCenter var(--duration-moderate) var(--ease-bounce);
}
```

**Notification Count Update**
```css
.notification-count {
  animation: scaleBounce var(--duration-moderate) var(--ease-bounce);
}
```

**Status Indicator**
```css
.status-online {
  animation: scalePulse 2s var(--ease-in-out) infinite;
}
```

---

## Page Transitions

### Full Page Transitions

**Page Enter (Default)**
```css
.page-enter {
  animation: fadeIn var(--duration-moderate) var(--ease-out);
}
```

**Page Exit (Default)**
```css
.page-exit {
  animation: fadeOut var(--duration-fast) var(--ease-in);
}
```

**Page Slide Left (Forward Navigation)**
```css
.page-slide-left-enter {
  animation: slideInRight var(--duration-moderate) var(--ease-out);
}

.page-slide-left-exit {
  animation: slideOutLeft var(--duration-moderate) var(--ease-in);
}
```

**Page Slide Right (Back Navigation)**
```css
.page-slide-right-enter {
  animation: slideInLeft var(--duration-moderate) var(--ease-out);
}

.page-slide-right-exit {
  animation: slideOutRight var(--duration-moderate) var(--ease-in);
}
```

**Page Fade Scale**
```css
.page-fade-scale-enter {
  animation: scaleIn var(--duration-moderate) var(--ease-out);
}

.page-fade-scale-exit {
  animation: scaleOut var(--duration-fast) var(--ease-in);
}
```

### Modal Transitions

**Modal Open**
```css
.modal-overlay {
  animation: fadeIn var(--duration-moderate) var(--ease-out);
}

.modal-content {
  animation: scaleIn var(--duration-moderate) var(--ease-out);
}
```

**Modal Close**
```css
.modal-overlay.closing {
  animation: fadeOut var(--duration-fast) var(--ease-in);
}

.modal-content.closing {
  animation: scaleOut var(--duration-fast) var(--ease-in);
}
```

**Bottom Sheet Open**
```css
.bottom-sheet-overlay {
  animation: fadeIn var(--duration-moderate) var(--ease-out);
}

.bottom-sheet-content {
  animation: slideInUp var(--duration-moderate) var(--ease-out);
}
```

**Bottom Sheet Close**
```css
.bottom-sheet-overlay.closing {
  animation: fadeOut var(--duration-fast) var(--ease-in);
}

.bottom-sheet-content.closing {
  animation: slideOutDown var(--duration-moderate) var(--ease-in);
}
```

### Drawer Transitions

**Drawer Left Open**
```css
.drawer-overlay {
  animation: fadeIn var(--duration-moderate) var(--ease-out);
}

.drawer-left-content {
  animation: slideInLeft var(--duration-moderate) var(--ease-out);
}
```

**Drawer Right Open**
```css
.drawer-right-content {
  animation: slideInRight var(--duration-moderate) var(--ease-out);
}
```

**Drawer Close**
```css
.drawer-overlay.closing {
  animation: fadeOut var(--duration-fast) var(--ease-in);
}

.drawer-left-content.closing {
  animation: slideOutLeft var(--duration-moderate) var(--ease-in);
}

.drawer-right-content.closing {
  animation: slideOutRight var(--duration-moderate) var(--ease-in);
}
```

### Popover & Tooltip

**Popover Open**
```css
.popover {
  animation: scaleInUp var(--duration-moderate) var(--ease-out);
  transform-origin: bottom center;
}

.popover[data-placement="top"] {
  transform-origin: bottom center;
}

.popover[data-placement="bottom"] {
  transform-origin: top center;
}

.popover[data-placement="left"] {
  transform-origin: right center;
}

.popover[data-placement="right"] {
  transform-origin: left center;
}
```

**Tooltip Show**
```css
.tooltip {
  animation: fadeIn var(--duration-fast) var(--ease-out);
}
```

**Tooltip Hide**
```css
.tooltip.hiding {
  animation: fadeOut var(--duration-immediate) var(--ease-in);
}
```

### Accordion & Collapse

**Accordion Expand**
```css
.accordion-content {
  animation: expandHeight var(--duration-moderate) var(--ease-out);
}

.accordion-icon {
  animation: rotate180 var(--duration-moderate) var(--ease-in-out);
}
```

**Accordion Collapse**
```css
.accordion-content.collapsing {
  animation: collapseHeight var(--duration-moderate) var(--ease-in);
}

.accordion-icon.collapsing {
  animation: rotate180 var(--duration-moderate) var(--ease-in-out) reverse;
}
```

---

## Gesture Animations

### Swipe Gestures

**Swipe to Delete**
```css
.swipeable-item {
  transition: transform var(--duration-base) var(--ease-out);
}

.swipeable-item.swiping {
  transition: none; /* Follow finger */
}

.swipeable-item.swiped-left {
  animation: slideOutLeft var(--duration-moderate) var(--ease-in);
}

.swipeable-item.swiped-right {
  animation: slideOutRight var(--duration-moderate) var(--ease-in);
}

.swipeable-item.snap-back {
  animation: slideInRight var(--duration-fast) var(--ease-out);
}
```

**Pull to Refresh**
```css
.pull-to-refresh-indicator {
  transition: transform var(--duration-base) var(--ease-out),
              opacity var(--duration-base) var(--ease-out);
}

.pull-to-refresh-indicator.pulling {
  transition: none; /* Follow finger */
}

.pull-to-refresh-indicator.releasing {
  animation: rotate360 1s linear infinite;
}

.pull-to-refresh-indicator.released {
  animation: fadeOut var(--duration-moderate) var(--ease-in);
}
```

### Drag & Drop

**Drag Start**
```css
.draggable-item.dragging {
  animation: scaleUp var(--duration-fast) var(--ease-out);
  opacity: 0.8;
  cursor: grabbing;
}
```

**Drop Target Highlight**
```css
.drop-target.drag-over {
  animation: borderGlow 1s var(--ease-in-out) infinite;
}
```

**Drop Success**
```css
.draggable-item.dropped {
  animation: scaleBounce var(--duration-moderate) var(--ease-bounce);
}
```

**Drop Revert**
```css
.draggable-item.reverting {
  animation: fadeOut var(--duration-moderate) var(--ease-in);
}
```

### Long Press

**Long Press Feedback**
```css
.long-pressable {
  transition: transform var(--duration-base) var(--ease-out);
}

.long-pressable.pressing {
  animation: scalePress var(--duration-fast) var(--ease-in-out);
}

.long-pressable.long-pressed {
  animation: scalePulse var(--duration-moderate) var(--ease-in-out);
}
```

### Pinch & Zoom

**Zoom In**
```css
.zoomable.zooming-in {
  animation: scaleIn var(--duration-moderate) var(--ease-out);
}
```

**Zoom Out**
```css
.zoomable.zooming-out {
  animation: scaleOut var(--duration-moderate) var(--ease-in);
}
```

### Scroll Animations

**Scroll Reveal**
```css
.scroll-reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity var(--duration-moderate) var(--ease-out),
              transform var(--duration-moderate) var(--ease-out);
}

.scroll-reveal.in-view {
  opacity: 1;
  transform: translateY(0);
}
```

**Parallax Effect**
```css
.parallax-layer {
  transition: transform var(--duration-base) linear;
}

/* Applied via JS based on scroll position */
```

**Sticky Header**
```css
.sticky-header {
  transition: transform var(--duration-moderate) var(--ease-out),
              box-shadow var(--duration-moderate) var(--ease-out);
}

.sticky-header.scrolling-up {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.sticky-header.scrolling-down {
  transform: translateY(-100%);
}
```

**Infinite Scroll Loading**
```css
.infinite-scroll-loader {
  animation: fadeInUp var(--duration-moderate) var(--ease-out);
}
```

---

## Loading States

### Skeleton Screens

**Skeleton Pulse**
```css
.skeleton {
  background: var(--color-gray-200);
  animation: skeletonShimmer 1.5s ease-in-out infinite;
}
```

**Skeleton to Content**
```css
.skeleton-container.loaded .skeleton {
  animation: fadeOut var(--duration-fast) var(--ease-in);
}

.skeleton-container.loaded .content {
  animation: fadeIn var(--duration-moderate) var(--ease-out) 150ms both;
}
```

### Progress Indicators

**Linear Progress (Determinate)**
```css
.progress-bar-fill {
  transition: width var(--duration-moderate) var(--ease-out);
}
```

**Linear Progress (Indeterminate)**
```css
.progress-bar-indeterminate {
  animation: progressBar 1.5s ease-in-out infinite;
}
```

**Circular Progress**
```css
.circular-progress-svg {
  animation: rotate360 2s linear infinite;
}

.circular-progress-circle {
  animation: circularProgress 1.5s ease-in-out infinite;
}
```

### Spinners

**Default Spinner**
```css
.spinner-default {
  animation: rotate360 1s linear infinite;
}
```

**Dots Spinner**
```css
.spinner-dots .dot {
  animation: dotsPulse 1.4s ease-in-out infinite;
}

.spinner-dots .dot:nth-child(2) {
  animation-delay: 0.2s;
}

.spinner-dots .dot:nth-child(3) {
  animation-delay: 0.4s;
}
```

**Bounce Spinner**
```css
.spinner-bounce .dot {
  animation: bounceDots 1.4s ease-in-out infinite;
}

.spinner-bounce .dot:nth-child(2) {
  animation-delay: 0.2s;
}

.spinner-bounce .dot:nth-child(3) {
  animation-delay: 0.4s;
}
```

### Lazy Loading

**Image Lazy Load**
```css
.lazy-image {
  opacity: 0;
  transition: opacity var(--duration-moderate) var(--ease-out);
}

.lazy-image.loaded {
  opacity: 1;
}
```

**Component Lazy Load**
```css
.lazy-component {
  animation: fadeInUp var(--duration-moderate) var(--ease-out);
}
```

---

## Accessibility in Motion

### Reduced Motion

**Critical Implementation**

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Respectful Animation Rules

**Essential vs. Decorative**

**Essential Motion** (keep even with reduced motion):
- Form validation feedback (change to instant color change)
- Focus indicators (change to instant outline)
- Loading states (change to instant state)
- State changes (change to instant opacity)

**Decorative Motion** (remove with reduced motion):
- Bounce effects
- Elaborate entrance animations
- Parallax scrolling
- Attention-seeking animations

**Implementation Pattern:**

```css
/* Default (with motion) */
.button {
  transition: transform 200ms ease-out;
}

.button:hover {
  transform: translateY(-2px);
}

/* Reduced motion alternative */
@media (prefers-reduced-motion: reduce) {
  .button {
    transition: background-color 20ms, border-color 20ms;
  }

  .button:hover {
    transform: none;
    background-color: var(--color-primary-hover);
  }
}
```

### Focus Indicators

**Always Visible, Never Animated Away**

```css
.interactive-element:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  /* No animation on outline itself */
}

/* Optional subtle pulse (disabled in reduced motion) */
@media (prefers-reduced-motion: no-preference) {
  .interactive-element:focus-visible {
    animation: focusPulse 2s ease-in-out infinite;
  }
}

@keyframes focusPulse {
  0%, 100% {
    outline-color: var(--color-primary);
  }
  50% {
    outline-color: var(--color-primary-light);
  }
}
```

### Screen Reader Announcements

**Announce State Changes**

```html
<!-- Loading state -->
<div role="status" aria-live="polite" aria-atomic="true">
  <span class="spinner" aria-hidden="true"></span>
  <span class="sr-only">Loading content...</span>
</div>

<!-- Success state -->
<div role="status" aria-live="polite">
  <span class="checkmark" aria-hidden="true"></span>
  <span class="sr-only">Item successfully added</span>
</div>

<!-- Error state -->
<div role="alert" aria-live="assertive">
  <span class="error-icon" aria-hidden="true"></span>
  <span>Invalid email address</span>
</div>
```

### Motion-Safe Utility Classes

```css
/* Only apply animation if motion is safe */
@media (prefers-reduced-motion: no-preference) {
  .motion-safe-fade-in {
    animation: fadeIn var(--duration-moderate) var(--ease-out);
  }

  .motion-safe-slide-in {
    animation: slideInUp var(--duration-moderate) var(--ease-out);
  }

  .motion-safe-bounce {
    animation: bounceIn var(--duration-slow) var(--ease-out);
  }
}

/* Fallback for reduced motion */
@media (prefers-reduced-motion: reduce) {
  .motion-safe-fade-in,
  .motion-safe-slide-in,
  .motion-safe-bounce {
    opacity: 1;
    transform: none;
  }
}
```

### Vestibular Disorder Considerations

**Avoid:**
- Large parallax scrolling
- Spinning or rotating UI elements (except loading spinners)
- Zooming or scaling the entire viewport
- Multiple elements moving in different directions simultaneously
- Continuous auto-playing animations

**Safe Alternatives:**
- Crossfades instead of slides
- Simple opacity changes
- Static illustrations instead of animations
- User-initiated motion only

---

## Implementation Guidelines

### CSS Animation Setup

**Base Setup in Global CSS:**

```css
:root {
  /* Duration tokens */
  --duration-instant: 0ms;
  --duration-immediate: 100ms;
  --duration-fast: 150ms;
  --duration-base: 200ms;
  --duration-moderate: 300ms;
  --duration-slow: 400ms;
  --duration-slower: 500ms;
  --duration-slowest: 700ms;

  /* Easing tokens */
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-sharp: cubic-bezier(0.4, 0, 0.6, 1);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-spring: cubic-bezier(0.5, 1.5, 0.5, 1);
  --ease-overshoot: cubic-bezier(0.34, 1.2, 0.64, 1);

  /* Delay tokens */
  --delay-none: 0ms;
  --delay-short: 50ms;
  --delay-medium: 100ms;
  --delay-long: 150ms;

  /* Stagger tokens */
  --stagger-children: 30ms;
  --stagger-list: 40ms;
  --stagger-grid: 50ms;
}

/* Reduced motion override */
@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-instant: 0ms;
    --duration-immediate: 1ms;
    --duration-fast: 1ms;
    --duration-base: 1ms;
    --duration-moderate: 1ms;
    --duration-slow: 1ms;
    --duration-slower: 1ms;
    --duration-slowest: 1ms;
  }
}
```

### React/TypeScript Implementation

**Animation Hook:**

```typescript
// useAnimation.ts
import { useEffect, useState, useRef } from 'react';

interface AnimationOptions {
  duration?: number;
  easing?: string;
  delay?: number;
  iterations?: number;
  fill?: 'none' | 'forwards' | 'backwards' | 'both';
}

export function useAnimation(
  animationName: string,
  options: AnimationOptions = {}
) {
  const [isAnimating, setIsAnimating] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  const {
    duration = 300,
    easing = 'ease-out',
    delay = 0,
    iterations = 1,
    fill = 'both'
  } = options;

  const animate = () => {
    if (!elementRef.current) return;

    const animation = elementRef.current.animate(
      getKeyframes(animationName),
      {
        duration,
        easing,
        delay,
        iterations,
        fill
      }
    );

    setIsAnimating(true);

    animation.onfinish = () => {
      setIsAnimating(false);
    };

    return animation;
  };

  return { elementRef, animate, isAnimating };
}

function getKeyframes(name: string): Keyframe[] {
  const keyframes: Record<string, Keyframe[]> = {
    fadeIn: [
      { opacity: 0 },
      { opacity: 1 }
    ],
    fadeOut: [
      { opacity: 1 },
      { opacity: 0 }
    ],
    scaleIn: [
      { opacity: 0, transform: 'scale(0.9)' },
      { opacity: 1, transform: 'scale(1)' }
    ],
    slideInUp: [
      { transform: 'translateY(100%)' },
      { transform: 'translateY(0)' }
    ],
    // Add more keyframe definitions...
  };

  return keyframes[name] || [];
}
```

**Usage Example:**

```typescript
// Button.tsx
import { useAnimation } from './hooks/useAnimation';

export function Button({ children, onClick }) {
  const { elementRef, animate } = useAnimation('scalePress', {
    duration: 150,
    easing: 'ease-in-out'
  });

  const handleClick = (e: React.MouseEvent) => {
    animate();
    onClick?.(e);
  };

  return (
    <button
      ref={elementRef}
      onClick={handleClick}
      className="button-primary"
    >
      {children}
    </button>
  );
}
```

### Framer Motion Integration

**Component with Animation:**

```typescript
import { motion } from 'framer-motion';

export function Card({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.3,
        ease: [0, 0, 0.2, 1] // ease-out
      }}
      whileHover={{
        y: -4,
        boxShadow: '0 8px 16px rgba(0,0,0,0.15)'
      }}
      whileTap={{
        scale: 0.98
      }}
    >
      {children}
    </motion.div>
  );
}
```

**Stagger Children:**

```typescript
const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0, 0, 0.2, 1]
    }
  }
};

export function List({ items }) {
  return (
    <motion.ul
      variants={listVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map(item => (
        <motion.li key={item.id} variants={itemVariants}>
          {item.content}
        </motion.li>
      ))}
    </motion.ul>
  );
}
```

### Performance Optimization

**GPU Acceleration:**

```css
/* Properties that trigger GPU acceleration */
.gpu-accelerated {
  transform: translateZ(0);
  will-change: transform, opacity;
}

/* Use transform and opacity only for best performance */
.performant-animation {
  /* GOOD - GPU accelerated */
  transition: transform 200ms, opacity 200ms;

  /* AVOID - causes layout recalculation */
  /* transition: width 200ms, height 200ms, top 200ms; */
}
```

**Will-Change Usage:**

```css
.will-animate {
  /* Add will-change before animation */
  will-change: transform, opacity;
}

.will-animate.animating {
  animation: slideIn 300ms ease-out;
}

.will-animate.done {
  /* Remove will-change after animation */
  will-change: auto;
}
```

**Composite Layers:**

```css
/* Create composite layer for smooth animation */
.composite-layer {
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}
```

---

## Testing & QA

### Animation Testing Checklist

**Visual Testing:**
- [ ] Animation plays smoothly at 60fps
- [ ] No jank or stuttering
- [ ] Easing feels natural
- [ ] Duration is appropriate
- [ ] Animation completes properly
- [ ] No layout shift during animation
- [ ] Works in all supported browsers
- [ ] Works on all target devices

**Interaction Testing:**
- [ ] Animation triggers on correct event
- [ ] Animation can be interrupted gracefully
- [ ] Rapid interactions handled properly
- [ ] Animation state cleaned up after completion
- [ ] Focus states visible during animation
- [ ] Keyboard navigation works during animations

**Accessibility Testing:**
- [ ] `prefers-reduced-motion` respected
- [ ] Alternative non-animated state provided
- [ ] Screen readers announce state changes
- [ ] Focus indicators never animated away
- [ ] Loading states announced to AT
- [ ] No vestibular triggers present

**Performance Testing:**
- [ ] No dropped frames (maintain 60fps)
- [ ] CPU usage acceptable
- [ ] Memory usage stable
- [ ] Battery impact minimal (mobile)
- [ ] Works on low-end devices
- [ ] Network conditions don't affect local animations

### Testing Tools

**Browser DevTools:**

```javascript
// Monitor FPS in Chrome DevTools
// 1. Open DevTools > Performance
// 2. Record interaction
// 3. Check FPS graph (should stay at 60fps)

// Force reduced motion for testing
// Chrome DevTools > Rendering > Emulate CSS media feature prefers-reduced-motion
```

**Automated Testing:**

```typescript
// animation.test.ts
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Button Animation', () => {
  it('should animate on click', async () => {
    const { container } = render(<Button>Click me</Button>);
    const button = screen.getByRole('button');

    await userEvent.click(button);

    // Check if animation class is applied
    expect(button).toHaveClass('animating');

    // Wait for animation to complete
    await waitFor(() => {
      expect(button).not.toHaveClass('animating');
    }, { timeout: 500 });
  });

  it('should respect reduced motion', () => {
    // Mock prefers-reduced-motion
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }));

    render(<Button>Click me</Button>);
    const button = screen.getByRole('button');

    // Animation duration should be minimal
    const styles = window.getComputedStyle(button);
    expect(styles.transitionDuration).toBe('0.01s');
  });
});
```

### Performance Benchmarks

**Target Metrics:**

| Metric | Target | Warning | Critical |
|--------|--------|---------|----------|
| FPS | 60 | 45-59 | <45 |
| Animation duration | As specified | +50ms | +100ms |
| CPU usage | <20% | 20-40% | >40% |
| Memory increase | <5MB | 5-10MB | >10MB |
| Battery impact (1hr) | <2% | 2-5% | >5% |

**Measurement Script:**

```javascript
// measureAnimation.js
function measureAnimationPerformance(element, animationName) {
  const startTime = performance.now();
  let frameCount = 0;
  let lastFrameTime = startTime;
  const frameTimes = [];

  function countFrame(currentTime) {
    frameCount++;
    const deltaTime = currentTime - lastFrameTime;
    frameTimes.push(deltaTime);
    lastFrameTime = currentTime;

    if (element.getAnimations().length > 0) {
      requestAnimationFrame(countFrame);
    } else {
      const endTime = performance.now();
      const totalDuration = endTime - startTime;
      const avgFPS = (frameCount / totalDuration) * 1000;
      const droppedFrames = frameTimes.filter(t => t > 16.67).length;

      console.log({
        animation: animationName,
        duration: totalDuration,
        frames: frameCount,
        avgFPS: avgFPS.toFixed(2),
        droppedFrames,
        performance: droppedFrames === 0 ? 'Excellent' :
                     droppedFrames < 5 ? 'Good' : 'Needs optimization'
      });
    }
  }

  requestAnimationFrame(countFrame);
}
```

---

## Developer Handoff

### Animation Specifications Document

For each animation, provide:

**1. Animation Name:** `fadeInUp`

**2. Use Cases:** Page content reveal, card entry, toast notifications

**3. Keyframes:**
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**4. Properties:**
- Duration: 300ms
- Easing: ease-out (`cubic-bezier(0, 0, 0.2, 1)`)
- Delay: 0ms (default)
- Fill mode: both

**5. CSS Class:**
```css
.fade-in-up {
  animation: fadeInUp var(--duration-moderate) var(--ease-out);
}
```

**6. React/Framer Component:**
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
/>
```

**7. Accessibility Notes:**
- Respects `prefers-reduced-motion`
- Alternative: instant opacity change
- Screen reader: No announcement needed (visual only)

**8. Performance Notes:**
- GPU accelerated (transform + opacity)
- Expected FPS: 60
- Works on mobile

### Code Examples

**Full Implementation Package:**

```
motion-design-system/
├── animations/
│   ├── keyframes.css          # All @keyframes definitions
│   ├── classes.css            # Utility classes
│   └── tokens.css             # CSS custom properties
├── hooks/
│   ├── useAnimation.ts        # React animation hook
│   ├── useReducedMotion.ts    # Accessibility hook
│   └── useScrollReveal.ts     # Scroll animations
├── components/
│   ├── AnimatedButton.tsx
│   ├── AnimatedCard.tsx
│   └── AnimatedModal.tsx
├── utils/
│   ├── animationConfig.ts     # Framer Motion configs
│   └── performanceMonitor.ts  # Performance tracking
└── README.md                  # Implementation guide
```

### Integration Checklist

**For Developers:**

- [ ] Import animation tokens CSS
- [ ] Set up reduced motion detection
- [ ] Install Framer Motion (if using)
- [ ] Configure build tools for CSS animations
- [ ] Add animation performance monitoring
- [ ] Test in all target browsers
- [ ] Verify accessibility compliance
- [ ] Document custom animations

**For Designers:**

- [ ] Provide animation specs for all interactions
- [ ] Specify duration and easing for each state
- [ ] Define stagger patterns for lists
- [ ] Document reduced motion alternatives
- [ ] Create animation demo videos
- [ ] Update design system documentation

### Common Pitfalls & Solutions

**Problem:** Animations stuttering on mobile
**Solution:** Use only transform and opacity, enable GPU acceleration

**Problem:** Layout shift during animation
**Solution:** Reserve space before animation, use absolute positioning for exit animations

**Problem:** Animation not respecting reduced motion
**Solution:** Always wrap decorative animations in `@media (prefers-reduced-motion: no-preference)`

**Problem:** Animation blocking interaction
**Solution:** Use `pointer-events: none` during animation if needed, or make animation interruptible

**Problem:** Inconsistent animation across browsers
**Solution:** Use CSS custom properties for timing, test in all browsers, use Framer Motion for complex animations

---

## Summary

### Quick Reference

**Most Common Animations:**
1. `fadeIn` / `fadeOut` - 200ms, ease-out/ease-in
2. `scaleIn` / `scaleOut` - 300ms, ease-out/ease-in
3. `slideInUp` / `slideOutDown` - 300ms, ease-out/ease-in
4. `rotate180` - 300ms, ease-in-out
5. `scaleBounce` - 300ms, ease-bounce

**Default Timings:**
- Hover: 150ms
- Click feedback: 200ms
- Modal open/close: 300ms
- Page transition: 400ms
- Loading loops: 1000-2000ms

**Default Easings:**
- Enter: ease-out
- Exit: ease-in
- Transform: ease-in-out
- Bounce: ease-bounce

**Accessibility:**
- Always provide `prefers-reduced-motion` alternative
- Keep essential motion, remove decorative
- Announce state changes to screen readers
- Never animate focus indicators away

---

**Total Animations Specified:** 81
**Categories Covered:** 12
**Variants Documented:** 80+
**Accessibility Patterns:** 6
**Performance Optimizations:** 8
**Testing Procedures:** 12

---

*End of Motion Design System Documentation*
