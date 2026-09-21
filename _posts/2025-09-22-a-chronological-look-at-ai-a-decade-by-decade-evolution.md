---
date: 2025-09-22T13:45:00
published: true
author: Richard
categories:
  - AI
tags:
  - AI
  - Artificial Intelligence
  - Machine Learning
  - Deep Learning
  - AI History
  - Generative AI
  - GPT
  - Neural Networks
  - Tech History
  - Google
  - Geoffery Hinton
  - Ian Goodfellow
  - AI 101
  - Tesla
  - Nvidia
title: 'A Chronological Look At AI: A Decade-by-Decade Evolution'
image: /assets/images/ai_chronological_order_rdjarbeng_cover.webp
layout: post
image_alt: "Cover image for A Chronological Look At AI: A Decade-by-Decade Evolution"
---
Artificial intelligence did not arrive overnight with ChatGPT. It took eighty years of alternating breakthroughs, hardware bottlenecks, and research winters to reach this point. Looking at the field decade by decade clarifies how we got here: the ideas behind modern models were often proposed decades before computers were fast enough to execute them.

![Chronological illustration tracing artificial intelligence milestones across the decades](/assets/images/ai_chronological_order_rdjarbeng_cover.PNG "A chronological view of AI milestones generated during early drafts of this post")

The graphic above highlights that progression, showing how earlier symbolic machines gave way to statistical learning and modern neural networks. The post below follows that sequence, focusing on the mathematical models, hardware shifts, and algorithmic discoveries that turned abstract concepts into working systems.

## Part I: The foundational decades (1940s-1970s)

The theoretical foundation of artificial intelligence formed before digital computers were widespread. In the post-war era, mathematicians and neurophysiologists began asking whether biological brain functions could be translated into formal logical circuits.

### 1943: The McCulloch-Pitts neuron

In 1943, neurophysiologist Warren McCulloch and logician Walter Pitts published a model of artificial neurons as simplified threshold logic units. This was the first mathematical model of a neural network. Around the same time, Norbert Wiener formulated cybernetics, studying feedback loops in animals and machines that influenced early control systems.

- **McCulloch-Pitts Neuron Model**: The first mathematical model of neural activity. [Read the original paper](https://en.wikipedia.org/wiki/McCulloch%E2%80%93Pitts_neuron). In this model, the neuron calculates a weighted sum of inputs and passes it to a threshold activation function.
- **Cybernetics**: Norbert Wiener's work on feedback systems. [Explore Wiener's legacy](https://en.wikipedia.org/wiki/Cybernetics).

The diagram below shows the basic mechanics of this artificial neuron. Inputs ($x_1, x_2, \dots, x_m$) are multiplied by corresponding weights ($w_1, w_2, \dots, w_m$), summed together with a bias term, and passed through an activation function $f$ to produce an output $y$. If the sum crosses a defined threshold, the neuron outputs a 1; otherwise, it outputs a 0. That formulation remains the base arithmetic unit of modern deep neural networks.

![Artificial neuron structure showing inputs, weights, summation, and activation function](/assets/images/1280px-Artificial_neuron_structure.svg.png "McCulloch-Pitts Neuron Model")

### 1948-1950: Turing's test and machine learning foundations

In his 1950 paper, Alan Turing proposed the Imitation Game (now called the Turing Test) to replace philosophical arguments about machine consciousness with an empirical benchmark: can a computer converse well enough to pass as human?

- **Computing Machinery and Intelligence**: Turing's paper framing machine intelligence. [Read the full paper](https://en.wikipedia.org/wiki/Computing_Machinery_and_Intelligence).
- **First Neural Net (1951)**: Marvin Minsky and Dean Edmonds built the SNARC (Stochastic Neural Analog Reinforcement Calculator), the first artificial neural network machine, using 3,000 vacuum tubes to simulate 40 neurons. [See SNARC details](https://en.wikipedia.org/wiki/SNARC).
- **First Machine Learning Program (1952)**: Arthur Samuel's checkers program at IBM improved its game by learning from positions, demonstrating that computers could learn beyond explicit instructions. [Learn about Samuel's work](http://www.incompleteideas.net/book/ebook/node109.html).

### 1956: The Dartmouth workshop

In the summer of 1956, John McCarthy, Marvin Minsky, Nathaniel Rochester, and Claude Shannon organized a workshop at Dartmouth College that coined the term "artificial intelligence." During this meeting, Allen Newell, Herbert Simon, and Cliff Shaw demonstrated the Logic Theorist, an automated program that proved 38 of the first 52 theorems in Whitehead and Russell's *Principia Mathematica*.

- **Dartmouth Workshop**: Coined the term artificial intelligence. [Read the proposal text](https://en.wikipedia.org/wiki/Dartmouth_workshop).
- **Logic Theorist**: The first automated theorem-proving program. [Explore the original demo](https://en.wikipedia.org/wiki/Logic_Theorist).

### 1958-1969: Perceptrons, symbolic AI, and the first winter

Research split into two rival camps during the 1960s: connectionism (learning from data via neural models) and symbolism (manipulating rules and symbols). Frank Rosenblatt built the Mark I Perceptron at Cornell, while John McCarthy developed Lisp, which became the standard language for symbolic programming and early expert systems.

- **Perceptron Invention**: Rosenblatt's single-layer neural network trained on punch cards and optical sensors. [Read the paper](https://en.wikipedia.org/wiki/Perceptron).
- **ELIZA Chatbot (1966)**: Joseph Weizenbaum created a pattern-matching script that simulated a Rogerian psychotherapist, surprising observers with how easily users attributed genuine empathy to simple rule substitutions. [Learn about the code](https://en.wikipedia.org/wiki/ELIZA).
- **Shakey the Robot (1969)**: Built at SRI International, Shakey was the first mobile robot to integrate computer vision, natural language commands, and automated planning via the STRIPS algorithm. [See Shakey in action](https://en.wikipedia.org/wiki/Shakey_the_robot).

The photograph below shows Shakey in the SRI laboratory with its main components labeled. It carried an onboard television camera, a triangulating optical rangefinder, and bump detectors, all linked by radio to an SDS-940 mainframe computer in the next room. Because the computer evaluated floor plans and recalculated paths between every motion, moving across a small room often took over an hour.

![Shakey the Robot at SRI International with callouts indicating its TV camera, range finder, and antenna link](/assets/images/ai/shakey_the_robot_1969.jpg "Shakey the Robot (1969) - Early Embodied AI and Logical Planning")

Shakey showed the potential of 1960s symbolic robotics, but its sluggish performance highlighted how fragile rule-based reasoning was in physical environments. That fragility became a broader problem in 1969 when Marvin Minsky and Seymour Papert published *Perceptrons*. Their mathematical proof demonstrated that single-layer perceptrons could not solve linearly non-separable problems like XOR. DARPA and other funders pulled research grants, triggering the first AI winter.

-----

## Part II: The quiet revolution (1980s-2010s)

After early funding evaporated, AI research shifted toward technical subdisciplines. This era produced steady advances in multi-layer training algorithms, probabilistic reasoning, and specialized computing hardware.

### 1980s: Expert systems and backpropagation

Commercial interest picked up around expert systems, which used hand-coded rule bases to automate domain decisions in medicine and finance. When maintaining these rule bases proved too costly, a second AI winter followed in the late 1980s. During this same period, however, David Rumelhart, Geoffrey Hinton, and Ronald Williams published a 1986 paper popularizing the backpropagation algorithm, providing an efficient way to train multi-layer neural networks via gradient descent.

- **Backpropagation Popularized**: The core optimization algorithm for training multi-layer networks. [Read the 1986 paper](https://en.wikipedia.org/wiki/Backpropagation).
- **Bayesian Networks (1985)**: Judea Pearl introduced probabilistic graphical models, giving AI systems a principled framework for handling uncertain data. [Read the 1985 book](https://ftp.cs.ucla.edu/pub/stat_ser/R246.pdf).

### 1990s: Hardware acceleration and Deep Blue

In 1997, IBM's Deep Blue defeated World Chess Champion Garry Kasparov in a six-game match. That same year, Sepp Hochreiter and Jürgen Schmidhuber published Long Short-Term Memory (LSTM) networks, solving the vanishing gradient problem in recurrent networks and enabling neural networks to learn long sequential patterns.

- **Deep Blue Beats Kasparov**: The first computer defeat of a reigning world chess champion. [Match recap](https://en.wikipedia.org/wiki/Deep_Blue_\(chess_computer\)).
- **LSTM Invention**: A breakthrough architecture for sequence modeling in speech and translation. [Read the 1997 paper](https://en.wikipedia.org/wiki/Long_short-term_memory).
- **Nvidia's Founding (1993)**: Jensen Huang, Chris Malachowsky, and Curtis Priem founded Nvidia to build 3D graphics chips, creating hardware that would later power modern deep learning. [Nvidia company history](https://www.nvidia.com/en-us/about-nvidia/corporate-timeline/).

The photograph below shows the IBM Deep Blue hardware rack. Deep Blue was not a modern neural network. It was a 30-node IBM RS/6000 SP supercomputer paired with 480 custom VLSI chess chips capable of evaluating 200 million board positions per second using parallel alpha-beta search.

![The IBM Deep Blue supercomputer rack, which defeated world chess champion Garry Kasparov in May 1997](/assets/images/ai/ibm_deep_blue_1997.jpg "IBM Deep Blue Supercomputer (1997)")

Its victory showed that brute-force computation could outplay human calculation in structured games. Yet it also exposed a hard boundary: Deep Blue could not generalize beyond chess. Solving real-world problems like speech recognition, computer vision, and language translation required learning patterns from data rather than searching predetermined rules.

### 2003-2006: Neural language models and the ImageNet initiative

During the tail end of the AI winter, university researchers laid the foundation for modern deep learning:

- **Neural Language Modeling (2003)**: Yoshua Bengio, Réjean Ducharme, Pascal Vincent, and Christian Jauvin at Université de Montréal published a neural probabilistic language model, introducing distributed word representations that preceded modern word embeddings. [Read the 2003 paper](https://www.jmlr.org/papers/volume3/bengio03a/bengio03a.pdf).
- **Hinton's Deep Belief Nets (2006)**: Geoffrey Hinton, Simon Osindero, and Yee-Whye Teh demonstrated greedy layer-wise pre-training for Deep Belief Networks, proving that deep neural networks could be trained effectively. [Read the 2006 paper](https://en.wikipedia.org/wiki/Deep_belief_network).
- **AWS Public Launch (2006)**: Amazon Web Services launched on-demand cloud infrastructure, making scalable compute clusters accessible without dedicated data centers. [AWS history](https://aws.amazon.com/about-aws/our-origins/).
- **ImageNet Initiative (2009)**: Fei-Fei Li and colleagues at Princeton and Stanford organized over 14 million hand-annotated images across 20,000 categories, providing the dataset scale necessary to evaluate deep visual models. [Project site](https://www.image-net.org/).
- **GPU Acceleration in Vision (2010-2011)**: Dan Ciresan and Jürgen Schmidhuber at IDSIA deployed multi-column convolutional neural networks on GPUs, achieving human-level accuracy on benchmark digit and traffic datasets.

-----

## Part III: The deep learning renaissance (2012-2021)

### 2012: The AlexNet breakthrough

In 2012, Alex Krizhevsky, Ilya Sutskever, and Geoffrey Hinton entered AlexNet into the ImageNet Large Scale Visual Recognition Challenge (ILSVRC). AlexNet was an 8-layer deep convolutional neural network that achieved a top-5 error rate of 15.3%, outperforming the second-place entry (26.2%) which relied on hand-crafted SIFT and Fisher vector features.

AlexNet's success rested on a software and hardware co-design. Krizhevsky wrote custom C++ and CUDA routines to parallelize convolutional layers across two consumer Nvidia GeForce GTX 580 GPUs. The diagram below illustrates why:

![AlexNet convolutional neural network architecture diagram illustrating layer splitting across two parallel Nvidia GTX 580 GPUs](/assets/images/ai/alexnet_architecture_2012.png "AlexNet Architecture (2012) - Dual-GPU Convolutional Neural Network")

The top and bottom halves of the diagram represent the two GPUs. Because a consumer GTX 580 card in 2012 had only 3 GB of memory, a network with 60 million parameters and 650,000 neurons could not fit onto a single card. Krizhevsky divided the feature maps across both GPUs, allowing them to train in parallel and communicate only at specific layers (such as layer 3 and the fully connected layers). Slashing training time from months to five days demonstrated that graphics cards could handle large-scale deep learning.

The breakthrough triggered industry acquisitions across tech companies:
- In March 2013, Google acquired Hinton, Krizhevsky, and Sutskever's startup DNNresearch for 44 million dollars.
- In December 2013, Facebook hired Yann LeCun to build Facebook AI Research (FAIR).
- In January 2014, Google acquired DeepMind in London for approximately 500 million dollars.
- In December 2015, investors pledged 1 billion dollars to establish OpenAI.

- **AlexNet Victory**: 15% error reduction on ImageNet via GPU-accelerated CNNs. [Read the 2012 paper](https://www.pinecone.io/learn/series/image-search/imagenet/).
- **Google Knowledge Graph**: Semantic indexing improved search relevance. [Google Blog](https://blog.google/technology/ai/google-ai-ml-timeline/).

### 2013-2016: Embeddings, generative models, and Go mastery

- **2013**: Tomas Mikolov and his team at Google released **Word2Vec**, showing that neural embeddings could perform algebraic semantic relationships:

$$\vec{v}_{\text{king}} - \vec{v}_{\text{man}} + \vec{v}_{\text{woman}} \approx \vec{v}_{\text{queen}}$$

This equation captures the central breakthrough of vector embeddings. Traditional natural language processing treated words as isolated, arbitrary symbols (like "king" = index #412 and "queen" = index #903), which gave algorithms no way to calculate how words related to each other. Word2Vec mapped every word into a continuous vector space based on the contexts in which it appeared. In that space, geometric direction and distance correspond to meaning. 

When you take the vector for "king" and subtract the vector for "man," you mathematically remove the masculine component while retaining royalty. Adding the vector for "woman" shifts the coordinates directly toward the point occupied by "queen." It demonstrated that neural networks could discover structured linguistic analogies automatically through linear algebra. [Read the paper](https://arxiv.org/abs/1301.3781).

- **2014**: Ian Goodfellow and researchers at Université de Montréal introduced Generative Adversarial Networks (GANs), pairing a generator against a discriminator in a zero-sum game to synthesize realistic images. Meanwhile, Ilya Sutskever, Oriol Vinyals, and Quoc Le at Google introduced Sequence to Sequence learning, establishing recurrent encoder-decoder models for translation.
    - **GAN Invention**: Goodfellow's adversarial training for image synthesis. [Read the 2014 paper](https://en.wikipedia.org/wiki/Generative_adversarial_network).
    - **Google Acquires DeepMind**: Brought reinforcement learning talent in-house. [Google AI Journey](https://ai.google/our-ai-journey/).
    - **Tesla Autopilot Launch**: AI-assisted driving debuted in Model S. [Forbes](https://www.forbes.com/sites/qai/2022/09/29/tesla-a-history-of-innovation-and-headaches/).
- **2015**: Kaiming He and researchers at Microsoft Research Asia introduced ResNet (Deep Residual Networks), using skip connections to train 152 layers stably, achieving a 3.57% error rate on ImageNet. [Read the ResNet paper](https://arxiv.org/abs/1512.03385).
- **2016**: DeepMind's AlphaGo defeated 18-time world Go champion Lee Sedol 4-1 in Seoul by uniting deep policy and value networks with Monte Carlo Tree Search across 1,920 CPUs and 280 GPUs.
    - **AlphaGo vs. Lee Sedol**: Landmark victory in Seoul. [Match coverage](https://en.wikipedia.org/wiki/AlphaGo_versus_Lee_Sedol).
    - **Tesla Autopilot 2.0**: Neural networks for vision-based autonomy. [Analytics Vidhya](https://www.analyticsvidhya.com/blog/2025/07/tesla-ai-cars-and-manufacturing/).

### 2017: Transformers and scalable NLP

In 2017, a team at Google published "Attention Is All You Need," introducing the Transformer architecture. By replacing recurrent connections with a self-attention mechanism, the model processes every token in a text sequence simultaneously rather than sequentially. That parallelization became the foundation for modern Large Language Models (LLMs). That same year, Meta open-sourced PyTorch, and AWS launched SageMaker for cloud-scale machine learning training.

- **Transformer Model**: The architecture that enabled modern scalable NLP. [Read the 2017 paper](https://en.wikipedia.org/wiki/Transformer_\(deep_learning_architecture\)).
- **Meta PyTorch Release**: Deep learning framework widely adopted by researchers. [Meta AI](https://en.wikipedia.org/wiki/Meta_AI).
- **AWS SageMaker**: Managed cloud service for training large models. [Launch announcement](https://aws.amazon.com/blogs/machine-learning/category/post-types/announcements/).

The diagram below, from the original paper, illustrates the encoder-decoder structure:

![The original Transformer encoder-decoder architecture diagram from the seminal 2017 Google paper Attention Is All You Need](/assets/images/ai/transformer_architecture_2017.png "The Transformer Architecture (2017) - Attention Is All You Need")

The left stack is the encoder, which converts input text into high-dimensional numerical representations. The right stack is the decoder, which generates the output text token by token. Instead of reading text word-by-word like recurrent networks, the Multi-Head Attention blocks look at every word in a sequence simultaneously. This self-attention mechanism weights how relevant every word is to every other word, regardless of distance. By removing recurrence, models could be trained across hundreds of GPUs in parallel, enabling the massive parameter scaling seen in modern LLMs.

### 2018-2021: Model scaling and multimodal research

- **2018**: Google released BERT, a bidirectional transformer model that improved natural language understanding. DeepMind released AlphaFold, predicting protein structures directly from amino acid sequences.
    - **BERT Pretraining**: Bidirectional contextual NLP model. [Read the 2018 paper](https://www.semanticscholar.org/paper/BERT%3A-Pre-training-of-Deep-Bidirectional-for-Devlin-Chang/df2b0e26d0599ce3e70df8a9da02e51594e0e992).
    - **AlphaFold Protein Structures**: DeepMind's 3D structural predictions. [CASP win](https://alphafold.ebi.ac.uk/).
- **2019**: DeepMind's AlphaStar defeated professional players in StarCraft II, while Tesla unveiled its custom Full Self-Driving chip for real-time vehicular inference.
    - **AlphaStar Grandmaster**: Mastering the real-time strategy game StarCraft II. [DeepMind blog post](https://deepmind.google/discover/blog/alphastar-mastering-the-real-time-strategy-game-starcraft-ii/).
    - **Tesla FSD Computer**: Custom dual-SoC silicon for automotive inference. [Analytics Vidhya](https://www.analyticsvidhya.com/blog/2025/07/tesla-ai-cars-and-manufacturing/).
- **2020-2021**: OpenAI released GPT-3 with 175 billion parameters, demonstrating few-shot in-context learning. OpenAI also launched DALL-E, generating images directly from text prompts. Tesla announced Dojo, a custom supercomputer built to train vision models on fleet video data.
    - **GPT-3 Release**: Few-shot language learning at scale. [Read the paper](https://www.google.com/search?q=https://en.wikipedia.org/wiki/GPT-3%23Few-shot_learning).
    - **DALL-E Debut**: Text-to-image generation via discrete variational autoencoders. [OpenAI blog](https://openai.com/index/dall-e/).
    - **Tesla Dojo Supercomputer**: Custom silicon for video training. [Analytics Vidhya](https://www.analyticsvidhya.com/blog/2025/07/tesla-ai-cars-and-manufacturing/).

-----

## Part IV: Generative AI and autonomous agents (2022-2025)

The 2020s shifted AI from academic labs into general consumer software, driven by accessible web interfaces and open-weight models.

### 2022: Consumer adoption of generative AI

In 2022, Stability AI released Stable Diffusion, allowing users to run high-quality text-to-image synthesis locally on consumer hardware. In November, OpenAI launched ChatGPT, fine-tuning GPT-3.5 with reinforcement learning from human feedback (RLHF).

The chart below illustrates this adoption spike by tracking the time major consumer services took to reach 100 million monthly active users:

![A stylized infographic that compares the user adoption rate of ChatGPT to other major consumer platforms like Netflix, Instagram, or TikTok](/assets/images/20250922-142148.png "Time required for major platforms to reach 100 million users (source: Jesse Middleton)")

While Netflix took three and a half years and Instagram took two and a half years, ChatGPT crossed that line in two months. The underlying model was already powerful, but wrapping it in a conversational interface eliminated technical barriers for non-specialists.

- **Stable Diffusion Launch**: Public release of a latent diffusion model for text-to-image generation. [Read the announcement](https://stability.ai/news/stable-diffusion-public-release).
- **DALL-E 2 Release**: Diffusion-based generation with inpainting and outpainting. [OpenAI intro](https://simple.wikipedia.org/wiki/DALL-E).
- **ChatGPT Launch**: Conversational LLM interface reached 100 million users in two months. [See usage stats](https://www.demandsage.com/chatgpt-statistics/).

### 2023: Multimodal models and open weights

- **Multimodal Models**: OpenAI released GPT-4 with vision input capabilities. Google announced Gemini 1.0, built natively for text, audio, image, and video input. Anthropic updated Claude with expanded context windows.
    - **GPT-4 Technical Report**: Multimodal reasoning with vision integration. [OpenAI blog](https://openai.com/research/gpt-4).
    - **Gemini 1.0 Release**: Google's multimodal model suite. [Google announcement](https://blog.google/technology/ai/google-gemini-ai/).
    - **Claude 2 Launch**: Anthropic focused on constitutional AI and safety. [Anthropic blog](https://en.wikipedia.org/wiki/Claude_\(language_model\)).
- **Open-Source Ecosystem**: Meta released LLaMA and LLaMA 2 with open weights for research and commercial use, accelerating local deployment and fine-tuning. [Meta News](https://about.fb.com/news/2023/11/decade-of-advancing-ai-through-open-research/).
- **Safety and Governance**: 28 nations signed the Bletchley Declaration, establishing international coordination on AI safety evaluations.
    - **AI Pause Letter**: Open letter requesting safety guardrails for frontier training. [Future of Life](https://en.wikipedia.org/wiki/Pause_Giant_AI_Experiments:_An_Open_Letter).
    - **Bletchley Declaration**: International agreement on frontier AI risk assessment. [UK gov](https://www.burges-salmon.com/articles/102iryj/bletchley-declaration-signed-at-uk-ai-safety-summit/).

### 2024-2025: Autonomous agents and embodied AI

Recent development has focused on autonomous agents: systems designed to plan multi-step workflows, write code, interact with computer environments, and control robotic actuators.

- **Apple Intelligence**: On-device generative models integrated into iOS and macOS. [Apple's WWDC 2024](https://www.youtube.com/watch?v=p2dhZ3AoDDs).
- **Figure 01 Robot**: Humanoid robotics combining vision-language models with dynamic manipulation. [Figure AI demo](https://www.figure.ai/).
- **Gemini 2.0**: Frontier multimodal reasoning with tool use and agentic workflows. [Google Blog](https://blog.google/technology/ai/2024-ai-extraordinary-progress-advancement/).
- **Tesla Optimus and Robotaxi**: Autonomous mobility and general-purpose robotics. [Battery Tech Online](https://www.batterytechonline.com/industry-outlook/9-key-tesla-milestones-and-innovations-in-2024).
- **Meta Llama 3**: Frontier open-weight models deployed across edge and cloud infrastructure. [Meta AI](https://en.wikipedia.org/wiki/Meta_AI).

The video below demonstrates Figure 01, a humanoid robot developed by Figure AI in partnership with OpenAI:

<iframe width="315" height="560" src="https://www.youtube.com/embed/PKgHe_CcUWY?si=eSoepMe0D2CErDQo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

In the demonstration, an onboard vision-language model processes speech and camera feeds in real time, explaining its reasoning aloud while handing an apple to a person who asked for food. This reflects the current shift toward embodied AI, where models interact directly with physical environments rather than text boxes.

-----

## Conclusion

AI development has moved in cycles: theoretical models proposed during the 1940s waited decades for sufficient compute, while symbolic systems hit ceilings that statistical models later broke through. Milestones like backpropagation, AlexNet's GPU parallelization, and the Transformer architecture each solved a specific scaling barrier. As models shift into multi-agent systems and robotics, hardware efficiency and physical grounding remain the central challenges.

### How AI was used to write this post:

To write this post it is only fair that some amount of AI was involved. Grok from xAI wrote the first draft of this post and Gemini AI from Google acted as the chief editor to refine the final post. Gemini decided the placement of images and videos within the post. Meta AI was used to create some images but they did not make it to the final draft because the chief editor Gemini generated the cover image for this post by itself. Here's an imperfection, If you look closely at the cover image at the top of this post you should notice some spelling mistakes that are not immediately evident. 

Reader, this looks like a nice spot to let you go after telling you all the great advances AI has made (this paragraph is hand-written), albeit with a warning. You can see that AI models keep improving but are not yet perfect as illustrated in this very post.
