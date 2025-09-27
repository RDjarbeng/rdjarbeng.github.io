---
date: 2025-04-20T18:25:00
author: Richard
categories:
  - Computer Vision
tags:
  - AI
  - Computer vision
  - Kolors
  - Virtual try-on
  - Hugging face
title: Kolors Virtual Try-On:Nobody's Gonna Know
image: /assets/images/Screenshot%202024-11-27%20220411.png
layout: post
video: ''
---
Let us examine the **Kolors Virtual Try-On** app a useful option for trying out different outfits virtually. By uploading an image, you can see how various clothing styles might look without needing to physically try them on. In this post I am going to show a demo of the virtual try-on model in action to see firsthand how it works, then I give my understanding of the process and how to achieve good results as well as my experience with different garments. 

## Virtual try-on Demo video
Here’s a short demo video to show how it works:

<iframe width="560" height="315" src="https://www.youtube.com/embed/NE3VyGCqMLU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

You just need a picture of yourself or model that you intend to try the outfit on. Then you can select one of the garments they have listed, or if you have your own pictures you want to try, upload those as well. The model takes about 5 seconds and you have the clothes fitted as if you actually wore them.

## How to Use Kolors Virtual Try-On with your chosen garments: Step-by-Step Guide

The **Kolors Virtual Try-On** tool offers a simple way to test outfits virtually. Below are the steps to use it effectively:

1. **Upload a Person Image**  
   Start by selecting a clear photo of yourself or someone else. This image will be used as the base for trying on the outfit. Click the "Person image" box to upload your photo.
2. **Upload a Garment Image**  
   Next, choose an image of the clothing item you’d like to try on. This could be a sweater, jacket, or any other garment. Click the "Garment image" box to upload the clothing item.
3. **Press "Run" to See the Result**  
   Once both images are uploaded, click the "Run" button. The tool will process the images and display the final result, showing how the garment looks on the person.

## Visual guide
Here’s a visual guide to the process:

![Kolorsvirtual try on steps](/assets/images/Screenshot%202024-11-27%20220411.png "Kolorsvirtual try on steps")

If you’re curious to try it yourself, you can check out the tool on its [Huggingface space](https://huggingface.co/spaces/Kwai-Kolors/Kolors-Virtual-Try-On). 

_Note: This isn’t my app—I’m just sharing my experience with it._

Well here are some of my attempts below_:_

![Default model for Kolors virtual try-on](/assets/images/kolors_default_model.png)

This was the default model for Kolors virtual try-on and the garment was from one of their provided options.

Even though this striped T shirt seemed more suited for a lady, I decided to try it out with one picture of me in a suit and the results are below. Not bad.![Richard trying out kolors virtual try-on](/assets/images/kolors_default_garment_rd.png "Richard trying out kolors virtual try-on")

Let's see what else it can do. Can it change the black suit I am wearing to something like this:

![Richard doing a suit swap with Kolors virtual try-on](/assets/images/kolors_default_suit_swap.png "Richard doing a suit swap with Kolors virtual try-on")

Not bad at all. It would be a bit hard to tell that the original was a black suit if you hadn't seen it before.

All right let's try something new I'm going to upload that image with a garment that's not in its library how do I know it's not in its library? Well, because the garment image, with the muscular guy in a vest with gold embroidery, is an AI generated image I took from [Adobe Firefly](https://www.adobe.com/products/firefly.html) so high probability the model was not trained on an image such as this. So let's see if I can change the suit to a 2-piece vest and tie.

![Vest swap failing for kolors virtual try-on](/assets/images/kolors_muscle_vest_swap_fail.png "Vest swap failing for kolors virtual try-on")

Oops! This did not turn out so good. I am not particularly sure why, but the shoulders were a bit of a challenge for the model. Let's try a different input image. Not giving up on wearing this vest on my model yet.

![Successful muscle vest swap](/assets/images/kolors_muscle_vest_swap_success2.png "Successful muscle vest swap")

Well this was splendid. Not particularly sure why this was much better than the previous attempt.However I am just glad this worked and the problem was not my AI-generated image. Here's a full image. Never thought I would see myself wearing something I designed and generated on the web.

![Richard wearing a two piece of vest with a black tie](/assets/images/kolors_muscle_vest_swap_final.png "Richard wearing a two piece of vest with a black tie")

Now let's try something a little bit different. After extensive research (a quick Google search) I found a picture of my favorite [super strika](https://www.youtube.com/user/TheSupaStrikas), Shakes, is lets let's see how that goes. This was a 2D cartoon character I tried to map onto a real life picture.

![Shakes from Super Strikers Kolors virtual try-on result](/assets/images/kolors_super_strikas.png "Shakes from Super Strikers Kolors virtual try-on result")

This did not turn out the way I expected it. It seems text in the picture confused the model and it actually added a part of that text over the super striker's logo on the jersey. It seems my plans of being a super strika may have to be postponed for now.

### How to achieve a good fit with virtual try-on
Now I think I'm starting to realize a pattern here. It seems your best chances of success is when the input image and the garment image, or the model in the garment image, have similar poses and similar outfits anything more complex in a model might get confused and give you some unexpected output.

![Richard using virtual try-on with a yellow African design](/assets/images/kolors_yellow_africa.png "Richard using virtual try-on with a yellow African design")

See, for example, this image above. Here the model added yellow sleeves to the garment even though the garment image does not have any yellow sleeves. 
Let me try to find some rational explanation for this; maybe because the suit in the input image had long sleeves the model decided to add sleeves and did it's best to keep the color that matched the design in the input. Thus giving us the output we see. However it worked fine on the AI model which had no sleeves and a garment was a bit similar to the garment image. This is a hypothesis that needs testing.

![Ai model in African print design](/assets/images/kolors_yellow_africa_model.png "Ai model in African print design")

_&#32;At this point I'm a bit jealous because it seems to work better on the AI model than on my own pictures._

Alright let us put this hypothesis to the test. I searched for an image similar to the pose and input garment I had and here are the results in 3,2,1...

![Richard in a jacket replaced with a sweater](/assets/images/kolors_sweater_model.png "Richard in a jacket replaced with a sweater")

it worked! Finally I cracked the code so using this virtual try-on AI application.🥳

Well that was fun. Overall, it appears to be a practical tool for testing outfits and should be useful for anyone looking to experiment with fashion choices efficiently.

### Possible improvements
I would like an option to see if a garment actually fits if the dimensions are provided but that would probably be out of the scope of this work.


## Conclusion

 Kolors virtual try-on is straightforward, and the results are convincing enough to give a good sense of fit and style for garments that the user wants to try out. However not all garments are equal here and the model seems to struggle when the input model and the garment fit vary in pose and garment style. In spite of all this I find it a useful tool for trying out different garments.
