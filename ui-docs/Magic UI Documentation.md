# Magic UI Documentation

Magic UI is a collection of re-usable components built for creating magical landing pages and user-facing marketing materials, heavily inspired by `shadcn/ui`.

## Installation

Magic UI components are installed using the `shadcn/ui` CLI with the `@magicui` namespace.

1.  **Ensure you have `shadcn/ui` initialized** in your project.
2.  **Add a component** using the CLI command, replacing `[component-name]` with the desired component (e.g., `marquee`):

    ```bash
    pnpm dlx shadcn@latest add @magicui/[component-name]
    # or using npm
    npx shadcn-ui@latest add @magicui/[component-name]
    ```

## Components Overview

The following table lists the available free components, their purpose, and a direct link to their documentation page for usage examples. Components marked as "Pro" have been excluded as per your request.

| Component | Purpose | Documentation Link |
| :--- | :--- | :--- |
| **Marquee** | An infinite scrolling component for text, images, or videos. | [https://magicui.design/docs/components/marquee](https://magicui.design/docs/components/marquee) |
| **Terminal** | A stylized terminal window component for displaying code or commands. | [https://magicui.design/docs/components/terminal](https://magicui.design/docs/components/terminal) |
| **Hero Video Dialog** | A dialog component that displays a video, typically used for hero sections. | [https://magicui.design/docs/components/hero-video-dialog](https://magicui.design/docs/components/hero-video-dialog) |
| **Bento Grid** | A flexible grid layout component, often used for showcasing features or content. | [https://magicui.design/docs/components/bento-grid](https://magicui.design/docs/components/bento-grid) |
| **Animated List** | A list component with smooth entry and exit animations for its items. | [https://magicui.design/docs/components/animated-list](https://magicui.design/docs/components/animated-list) |
| **Dock** | A macOS-style dock component that expands on hover. | [https://magicui.design/docs/components/dock](https://magicui.design/docs/components/dock) |
| **Globe** | An interactive 3D globe component, often used for showing global reach. | [https://magicui.design/docs/components/globe](https://magicui.design/docs/components/globe) |
| **Tweet Card** | A stylized card component for displaying embedded tweets or testimonials. | [https://magicui.design/docs/components/tweet-card](https://magicui.design/docs/components/tweet-card) |
| **Orbiting Circles** | Circles that orbit a central point, creating a subtle background effect. | [https://magicui.design/docs/components/orbiting-circles](https://magicui.design/docs/components/orbiting-circles) |
| **Avatar Circles** | A group of avatars arranged in a circular, overlapping pattern. | [https://magicui.design/docs/components/avatar-circles](https://magicui.design/docs/components/avatar-circles) |
| **Icon Cloud** | A 3D tag cloud that rotates icons, often used for displaying tech stacks. | [https://magicui.design/docs/components/icon-cloud](https://magicui.design/docs/components/icon-cloud) |
| **Lens** | A magnifying glass effect that follows the cursor. | [https://magicui.design/docs/components/lens](https://magicui.design/docs/components/lens) |
| **Pointer** | A custom cursor component with an animated pointer effect. | [https://magicui.design/docs/components/pointer](https://magicui.design/docs/components/pointer) |
| **Smooth Cursor** | A custom, smoothly animated cursor that replaces the default one. | [https://magicui.design/docs/components/smooth-cursor](https://magicui.design/docs/components/smooth-cursor) |
| **Progressive Blur** | An effect that progressively blurs an element as the user scrolls. | [https://magicui.design/docs/components/progressive-blur](https://magicui.design/docs/components/progressive-blur) |
| **Dotted Map** | A map component with a dotted, animated background effect. | [https://magicui.design/docs/components/dotted-map](https://magicui.design/docs/components/dotted-map) |
| **Animated Beam** | A line that connects two elements with an animated, glowing beam effect. | [https://magicui.design/docs/components/animated-beam](https://magicui.design/docs/components/animated-beam) |
| **Border Beam** | A glowing, animated border that sweeps around an element. | [https://magicui.design/docs/components/border-beam](https://magicui.design/docs/components/border-beam) |
| **Shine Border** | A border that has a subtle, animated shine effect. | [https://magicui.design/docs/components/shine-border](https://magicui.design/docs/components/shine-border) |
| **Magic Card** | A card component with a subtle, animated glow effect. | [https://magicui.design/docs/components/magic-card](https://magicui.design/docs/components/magic-card) |
| **Meteors** | A background effect that simulates meteors streaking across the screen. | [https://magicui.design/docs/components/meteors](https://magicui.design/docs/components/meteors) |
| **Confetti** | A component to trigger a confetti animation, typically on success or celebration. | [https://magicui.design/docs/components/confetti](https://magicui.design/docs/components/confetti) |
| **Particles** | A customizable particle background effect. | [https://magicui.design/docs/components/particles](https://magicui.design/docs/components/particles) |
| **Animated Theme Toggler** | A button component to switch between light and dark themes with an animation. | [https://magicui.design/docs/components/animated-theme-toggler](https://magicui.design/docs/components/animated-theme-toggler) |
| **Blur Fade** | A text or element that fades in with a subtle blur effect. | [https://magicui.design/docs/components/blur-fade](https://magicui.design/docs/components/blur-fade) |
| **Text Animate** | A general-purpose component for animating text. | [https://magicui.design/docs/components/text-animate](https://magicui.design/docs/components/text-animate) |
| **Typing Animation** | An effect that simulates text being typed out. | [https://magicui.design/docs/components/typing-animation](https://magicui.design/docs/components/typing-animation) |
| **Line Shadow Text** | Text with a shadow effect that follows a line. | [https://magicui.design/docs/components/line-shadow-text](https://magicui.design/docs/components/line-shadow-text) |
| **Aurora Text** | Text with a glowing, aurora-like background effect. | [https://magicui.design/docs/components/aurora-text](https://magicui.design/docs/components/aurora-text) |
| **Video Text** | Text that reveals a video playing in the background. | [https://magicui.design/docs/components/video-text](https://magicui.design/docs/components/video-text) |
| **Number Ticker** | An animated counter that "ticks" up to a final number. | [https://magicui.design/docs/components/number-ticker](https://magicui.design/docs/components/number-ticker) |
| **Animated Shiny Text** | Text with a sweeping, animated shine effect. | [https://magicui.design/docs/components/animated-shiny-text](https://magicui.design/docs/components/animated-shiny-text) |
| **Animated Gradient Text** | Text with an animated gradient color fill. | [https://magicui.design/docs/components/animated-gradient-text](https://magicui.design/docs/components/animated-gradient-text) |
| **Text Reveal** | Text that is revealed word by word or line by line. | [https://magicui.design/docs/components/text-reveal](https://magicui.design/docs/components/text-reveal) |
| **Hyper Text** | Text with a dynamic, hyper-stylized appearance. | [https://magicui.design/docs/components/hyper-text](https://magicui.design/docs/components/hyper-text) |
| **Word Rotate** | A component that rotates through a list of words with an animation. | [https://magicui.design/docs/components/word-rotate](https://magicui.design/docs/components/word-rotate) |
| **Scroll Based Velocity** | An animation that changes speed based on the user's scroll velocity. | [https://magicui.design/docs/components/scroll-based-velocity](https://magicui.design/docs/components/scroll-based-velocity) |
| **Sparkles Text** | Text with a subtle, sparkling particle effect. | [https://magicui.design/docs/components/sparkles-text](https://magicui.design/docs/components/sparkles-text) |
| **Morphing Text** | Text that smoothly morphs from one shape or style to another. | [https://magicui.design/docs/components/morphing-text](https://magicui.design/docs/components/morphing-text) |
| **Spinning Text** | Text that spins or rotates as part of an animation. | [https://magicui.design/docs/components/spinning-text](https://magicui.design/docs/components/spinning-text) |
| **Text Highlighter** | Text that is highlighted with a sweeping or animated effect. | [https://magicui.design/docs/components/text-highlighter](https://magicui.design/docs/components/text-highlighter) |
| **Safari** | A mock-up of a Safari browser window for showcasing content. | [https://magicui.design/docs/components/safari](https://magicui.design/docs/components/safari) |
| **iPhone** | A mock-up of an iPhone device for showcasing mobile content. | [https://magicui.design/docs/components/iphone](https://magicui.design/docs/components/iphone) |
| **Android** | A mock-up of an Android device for showcasing mobile content. | [https://magicui.design/docs/components/android](https://magicui.design/docs/components/android) |
| **Rainbow Button** | A button with a vibrant, animated rainbow border or fill. | [https://magicui.design/docs/components/rainbow-button](https://magicui.design/docs/components/rainbow-button) |
| **Shimmer Button** | A button with a subtle, animated shimmer effect. | [https://magicui.design/docs/components/shimmer-button](https://magicui.design/docs/components/shimmer-button) |
| **Ripple Button** | A button that generates a ripple effect on click. | [https://magicui.design/docs/components/ripple-button](https://magicui.design/docs/components/ripple-button) |
| **Flickering Grid** | A background grid pattern that flickers or animates subtly. | [https://magicui.design/docs/components/flickering-grid](https://magicui.design/docs/components/flickering-grid) |
| **Animated Grid Pattern** | A background grid pattern with a smooth, continuous animation. | [https://magicui.design/docs/components/animated-grid-pattern](https://magicui.design/docs/components/animated-grid-pattern) |
| **Retro Grid** | A background grid pattern with a retro, 80s-style aesthetic. | [https://magicui.design/docs/components/retro-grid](https://magicui.design/docs/components/retro-grid) |
| **Ripple** | A general-purpose component for creating a ripple effect. | [https://magicui.design/docs/components/ripple](https://magicui.design/docs/components/ripple) |
| **Dot Pattern** | A background pattern composed of dots. | [https://magicui.design/docs/components/dot-pattern](https://magicui.design/docs/components/dot-pattern) |
| **Grid Pattern** | A static background grid pattern. | [https://magicui.design/docs/components/grid-pattern](https://magicui.design/docs/components/grid-pattern) |
| **Striped Pattern** | A background pattern composed of animated stripes. | [https://magicui.design/docs/components/striped-pattern](https://magicui.design/docs/components/striped-pattern) |
| **Interactive Grid Pattern** | A grid pattern that reacts to user interaction, such as mouse movement. | [https://magicui.design/docs/components/interactive-grid-pattern](https://magicui.design/docs/components/interactive-grid-pattern) |
| **Light Rays** | A background effect that simulates light rays emanating from a source. | [https://magicui.design/docs/components/light-rays](https://magicui.design/docs/components/light-rays) |
| **Shiny Button** | A button with a prominent, animated shine effect. | [https://magicui.design/docs/components/shiny-button](https://magicui.design/docs/components/shiny-button) |
| **File Tree** | A component to display a file structure hierarchy. | [https://magicui.design/docs/components/file-tree](https://magicui.design/docs/components/file-tree) |
| **Code Comparison** | A component for displaying two versions of code side-by-side for comparison. | [https://magicui.design/docs/components/code-comparison](https://magicui.design/docs/components/code-comparison) |
| **Scroll Progress** | A visual indicator of the user's scroll progress on the page. | [https://magicui.design/docs/components/scroll-progress](https://magicui.design/docs/components/scroll-progress) |
| **Neon Gradient Card** | A card component with a vibrant, neon-style gradient border. | [https://magicui.design/docs/components/neon-gradient-card](https://magicui.design/docs/components/neon-gradient-card) |
| **Comic Text** | Text styled with a comic book aesthetic. | [https://magicui.design/docs/components/comic-text](https://magicui.design/docs/components/comic-text) |
| **Cool Mode** | A component that applies a "cool mode" visual filter to its children. | [https://magicui.design/docs/components/cool-mode](https://magicui.design/docs/components/cool-mode) |
| **Pixel Image** | An image component that displays the image with a pixelated effect. | [https://magicui.design/docs/components/pixel-image](https://magicui.design/docs/components/pixel-image) |
| **Pulsating Button** | A button that subtly pulsates to draw attention. | [https://magicui.design/docs/components/pulsating-button](https://magicui.design/docs/components/pulsating-button) |
| **Warp Background** | A background effect that simulates a warp or tunnel animation. | [https://magicui.design/docs/components/warp-background](https://magicui.design/docs/components/warp-background) |
| **Interactive Hover Button** | A button that displays a complex animation or effect on hover. | [https://magicui.design/docs/components/interactive-hover-button](https://magicui.design/docs/components/interactive-hover-button) |
| **Animated Circular Progress Bar** | A circular progress bar with a smooth, animated fill. | [https://magicui.design/docs/components/animated-circular-progress-bar](https://magicui.design/docs/components/animated-circular-progress-bar) |
