# README.md

## Project Overview

This is an interactive animation project created using p5.js. The project features elements such as moving clouds, grass, and a sun, all of which users can interact with. The goal is to create a unique dynamic experience through the combination of multiple visual effects, suitable for artistic creation and visual exploration.

## How to Interact with the Project

1. **Load the Page**: Open `index.html`, and the project will automatically load and run in your browser.
2. **Bird Animation**: Once the page is loaded, a bird shape (formed from clouds) will gradually move and rotate, displaying its graceful shape. The grass will also sway in response to mouse movement on the screen.
3. **Sun Interaction**: On the left side of the screen, you will see an animated sun whose rays change shape continuously using a noise function.

## Detailed Description of the Project
Time-Based Animation
Description: I am responsible for implementing time-based animation effects. By tracking the passage of time, my section ensures that animation elements change continuously as time progresses. For example, a timer is set up to modify colors, opacity, or position at intervals, simulating natural phenomena like day-night cycles or tides.
Implementation Technique: Using millis() or frameCount as a time-tracking method to control animation triggers. Timers are set to allow smooth, gradual changes in the animation.
Code Example: Changing background color every few seconds to simulate a day-night cycle.

### Personal Contribution to the Group Code

During the development of this project, I focused on creating natural elements (clouds, grass, and the sun) and making them interactive and dynamic. My personal code contributions are concentrated on the following aspects:

1. **Clouds and Bird Animation**: I created a bird shape out of clouds and used the masking functionality in p5.js to make the cloud take the shape of the bird. The rotation and position are animated to give a lively effect as the bird slowly moves and rotates across the screen.
2. **Dynamic Grass Response**: The grass responds to the movement of the mouse, simulating the effect of wind, using the `Perlin` noise algorithm to create a natural swaying effect.
3. **Organic Sun Shape**: The rays of the sun change based on a noise function, creating a lively and ever-changing effect similar to light scattering in the air.

### Animation Driver

I chose **Perlin noise** to drive the animation, particularly for the dynamic generation of the sun and the grass. Perlin noise provides a more natural-looking randomness, making the movements appear more organic and irregular, which aligns well with the natural characteristics of grass and light.

### Animated Properties

- **Clouds/Bird**: The clouds are animated to form the shape of a bird, with movement and rotation being the main parameters. As the bird rotates and changes position, it creates the effect of soaring across the screen.
- **Grass**: Each blade of grass reacts to the horizontal movement of the mouse, simulating wind. The sway magnitude is influenced by the speed of the mouse movement, emphasizing the real-time response.
- **Sun**: The rays of the sun are animated using `Perlin` noise, giving them a lifelike vitality.

### Differences from Other Team Members

- My focus was mainly on **the bird-shaped cloud masking animation** and **the interactivity of the grass**, particularly the dynamic response of the grass to mouse movement. Other team members may have focused more on color changes or specific animation displays of certain elements.

### Animation Inspiration

My inspiration came from natural scenes such as **birds soaring freely in the sky** and **wind-swept grass**. With this inspiration, I aimed to create a relaxing yet lively visual experience. The animation of the bird shape and the swaying grass was inspired by scenes in nature documentaries, striving to convey a sense of natural harmony.

### Technical Explanation

- **Cloud Masking**: The bird shape is created using the `mask()` method in p5.js to apply the cloud image to the drawn bird shape, resulting in a unique masked effect. This technique allows for custom-shaped image displays.
- **Perlin Noise**: The grass sway and the sun’s rays use `Perlin` noise, making these animations look more natural and organic.

### Update Log

Initial Version: Basic wave animation to simulate the ocean flow.
Update 1: Added audio-driven animations, making elements respond to frequency and rhythm in music.
Update 2: Introduced Perlin noise effects, simulating natural wave flows and floating objects.
Update 3: Implemented time-based animations, gradually changing elements over time, such as background color transitions.
Update 4: Added user interaction, allowing users to influence the animation through mouse clicks and keyboard inputs.

## Changes to Group Code

I expanded the interactive part of the grass animation in the group code, allowing it to more accurately simulate the effect of wind based on mouse movement. By adjusting the response parameters for each segment of the grass, I enhanced the interaction between the grass and wind, making the overall animation more realistic.

## Additional Tools and Techniques Used

During the implementation of the project, I used the noise function and the graphic masking functionality provided by p5.js to enhance the naturalness and interactivity of the visual effects. These tools are well-suited for creating organic changes in natural scenes.

### External Resources Referenced

- **Noise Function**: The noise function generates pseudo-random gradient values that can be used to simulate complex textures and movements in nature. I learned and applied this method from the official p5.js documentation.
  - Reference link: [p5.js Noise Reference](https://p5js.org/reference/#/p5/noise)
- **Graphic Masking**: The masking technique is used to clip the cloud image into the shape of the bird. I learned about drawing and masking concepts from the MDN documentation.
  - Reference link: [MDN Masking Concept](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation)



