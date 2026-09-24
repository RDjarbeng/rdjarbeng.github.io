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

To understand modern artificial intelligence, it helps to start before digital computers were common. During the 1940s and 1950s, researchers were not trying to build consumer apps or conversational assistants. They were asking a foundational question: can the electrical activity of a living brain be translated into mathematical formulas and executed on a machine?

That question divided early computer science into two competing philosophies. One group believed machines should learn from scratch using artificial brain cells, an approach called connectionism. The rival group believed machines should be programmed with explicit human rules, logic, and symbols, an approach called symbolic AI. The tension between these two ideas defined the first thirty years of artificial intelligence.

### 1943: The McCulloch-Pitts neuron and the math of thought

The starting point of artificial intelligence was not a piece of software, but a biology paper. In 1943, neurophysiologist Warren McCulloch and logician Walter Pitts published a mathematical model of an artificial brain cell. At the time, human thought was viewed as an intangible mystery. McCulloch and Pitts proposed that an individual brain cell could be understood as an electrical logic switch.

In their model, an artificial neuron receives multiple incoming data signals, multiplies each signal by an assigned weight, adds them together, and checks whether the total crosses a threshold. If the total crosses the threshold, the neuron fires (outputs a 1). If it falls short, it stays silent (outputs a 0).

In mathematical notation, this threshold process is written as:

$$
y = f\left(\sum_{i=1}^{m} w_i x_i + b\right)
$$

Here, the inputs $$x_1, x_2, \dots, x_m$$ represent the incoming data, the weights $$w_1, w_2, \dots, w_m$$ represent the importance or strength of each input, $$b$$ is an adjustable bias value that sets the firing threshold, and $$f$$ is the activation function that produces the final output $$y$$.

The diagram below shows this flow in visual form:

![Artificial neuron structure showing inputs, weights, summation, and activation function](/assets/images/1280px-Artificial_neuron_structure.svg.png "McCulloch-Pitts Neuron Model")

- **Why it is included**: It proved that thought could be translated into arithmetic. By demonstrating that networks of simple switches could calculate basic logical functions like AND, OR, and NOT, McCulloch and Pitts showed that thinking could theoretically be performed by a machine. [Read the original paper](https://en.wikipedia.org/wiki/McCulloch%E2%80%93Pitts_neuron).
- **The significance**: It established that intelligence does not require organic biology. Simple, non-living parts can simulate reasoning if connected properly.
- **What it influences later**: This single formula remains the fundamental arithmetic unit of modern deep learning. When a computer runs a modern system like GPT-4 or an autonomous vehicle vision model, it is executing billions of these weighted sums stacked in layers.
- **Cybernetics connection**: Around the same time, mathematician Norbert Wiener developed cybernetics, studying how animals and machines control themselves through feedback loops. [Explore Wiener's legacy](https://en.wikipedia.org/wiki/Cybernetics). This introduced the idea that machines could automatically correct their own errors.

Having established that an artificial brain cell was mathematically possible, researchers needed a way to measure whether a complete machine was actually thinking.

### 1948-1952: The Turing test and early learning programs

In 1950, British mathematician Alan Turing published "Computing Machinery and Intelligence." Rather than getting trapped in debates about machine consciousness, Turing proposed an operational benchmark called the Imitation Game (now known as the Turing Test). If an interrogator communicates with an unseen entity through text and cannot reliably tell whether they are talking to a human or a computer, the machine passes the test.

Turing shifted the benchmark from abstract philosophy to observable behavior. Engineers immediately set out to see if hardware could learn on its own.

- **SNARC (1951)**: Marvin Minsky and Dean Edmonds built the Stochastic Neural Analog Reinforcement Calculator (SNARC). Using 3,000 vacuum tubes and surplus military equipment, it simulated a network of 40 artificial neurons that learned to navigate a virtual maze through trial and error. [See SNARC details](https://en.wikipedia.org/wiki/SNARC).
- **Arthur Samuel's Checkers Program (1952)**: Working at IBM, Arthur Samuel wrote a program that played checkers. Samuel did not write code telling the computer how to respond to every board state. Instead, he created a scoring formula that rewarded board advantages and penalized mistakes, enabling the program to play against itself and improve with experience. [Learn about Samuel's work](http://www.incompleteideas.net/book/ebook/node109.html).

- **Why it is included**: Samuel coined the term "machine learning" during this work. He showed that computers did not need programmers to anticipate every move. A system could learn rules on its own through trial and error.
- **The significance**: It challenged the assumption that computers could only perform explicit instructions written by human programmers.
- **What it influences later**: Samuel's self-play method was the first working demonstration of reinforcement learning. Decades later, this same self-play principle enabled DeepMind's AlphaGo to master the game of Go, and it forms the foundation of the reinforcement learning from human feedback (RLHF) used to train modern chatbots.

With evidence that computers could learn rules through practice, researchers organized to turn these scattered experiments into a unified field.

### 1956: The Dartmouth workshop and the birth of AI

In the summer of 1956, mathematicians, engineers, and psychologists gathered at Dartmouth College in New Hampshire. Organized by John McCarthy, Marvin Minsky, Nathaniel Rochester, and Claude Shannon, the gathering's written proposal introduced the term "artificial intelligence" for the first time.

The researchers made a clear wager: every aspect of learning and intelligence could be described with enough mathematical precision that a machine could simulate it. During the workshop, Allen Newell, Herbert Simon, and Cliff Shaw demonstrated the Logic Theorist, a program that proved 38 mathematical theorems from Whitehead and Russell's *Principia Mathematica*.

- **Why it is included**: It officially named the field and established artificial intelligence as an independent research discipline, separate from traditional mathematics and computer engineering. [Read the proposal text](https://en.wikipedia.org/wiki/Dartmouth_workshop).
- **The significance**: The Logic Theorist proved that computers were not just numeric calculators for military artillery tables. They could manipulate abstract symbols to solve logical puzzles. [Explore the original demo](https://en.wikipedia.org/wiki/Logic_Theorist).
- **What it influences later**: The workshop committed early research to the symbolic AI approach, which assumed that intelligence is primarily a matter of following rules and manipulating symbols. This led directly to the expert systems boom of the 1980s, computer algebra systems, and modern search engine knowledge graphs.

The success of symbolic logic sparked a rivalry with researchers who believed machines should learn from sensory data instead.

### 1958-1969: Perceptrons, chatbots, and physical bottlenecks

The 1960s pitted the two competing philosophies against each other.

In 1958, Frank Rosenblatt built the Mark I Perceptron at the Cornell Aeronautical Laboratory. While the earlier McCulloch-Pitts neuron had fixed settings, Rosenblatt's Perceptron adjusted its own internal weights automatically when shown image cards through a camera. The New York Times reported it as the foundation of future machines expected to walk, talk, and see. [Read the paper](https://en.wikipedia.org/wiki/Perceptron).

Meanwhile, symbolic AI produced two famous demonstrations that illustrated both the promise and the fragility of rule-based programming:

- **ELIZA (1966)**: Joseph Weizenbaum at MIT wrote a script that simulated a psychotherapist. [Learn about the code](https://en.wikipedia.org/wiki/ELIZA). ELIZA had no internal understanding of human thoughts. It simply identified keywords in the user's sentence and inserted them into canned template responses. Despite this simplicity, users formed personal attachments and believed the software possessed real empathy.
- **Shakey the Robot (1969)**: Engineers at SRI International built Shakey, the first mobile robot to combine computer vision, natural language commands, and automated logical planning using the STRIPS algorithm. [See Shakey in action](https://en.wikipedia.org/wiki/Shakey_the_robot).

The photograph below shows Shakey in the SRI laboratory with its primary components labeled:

![Shakey the Robot at SRI International with callouts indicating its TV camera, range finder, and antenna link](/assets/images/ai/shakey_the_robot_1969.jpg "Shakey the Robot (1969): Early Embodied AI and Logical Planning")

Shakey carried an onboard television camera, an optical rangefinder, and bump sensors, connected by radio to an SDS-940 mainframe computer in the next room. Because the computer had to recalculate full floor plans and update symbolic logic tables before every movement, pushing a block across a small room often took over an hour.

- **Why it is included**: These projects demonstrated the real-world limits of early AI. ELIZA exposed the human tendency to mistake pattern matching for genuine intelligence. Shakey showed that trying to navigate the messy physical world using pure deductive logic creates a massive computing bottleneck.
- **The significance**: They proved that solving clean academic puzzles does not translate cleanly to messy real-world environments.
- **What it influences later**: ELIZA serves as the earliest case study in chatbot psychology and user trust, issues that dominate conversations around modern AI companions. Shakey produced the A* pathfinding algorithm, which is still used today in GPS mapping software, robotics, and video game navigation.

Despite these engineering milestones, the entire field was about to hit a theoretical wall.

### 1969: The XOR wall and the first AI winter

In 1969, Marvin Minsky and Seymour Papert published a mathematical study titled *Perceptrons*. Their analysis proved that single-layer neural networks like Rosenblatt's Perceptron were mathematically incapable of solving non-linear logic problems, including the simple exclusive OR (XOR) function.

An XOR operation produces a 1 if either input is true, but produces a 0 if both inputs are true or both are false. A single layer of artificial neurons can only draw a single straight boundary line through data, which cannot separate the diagonal classes of an XOR problem. Minsky and Papert noted that solving complex problems required multi-layer networks, but no researcher at the time knew how to calculate errors and adjust weights inside the hidden middle layers.

The book stalled neural network research. Because symbolic systems like Shakey were too brittle for practical adoption and neural networks hit a mathematical ceiling, funding agencies like DARPA grew tired of unfulfilled claims and canceled research grants. The field entered its first prolonged funding drought, known as the first AI winter.

Neural networks remained largely sidelined until researchers in the 1980s proved that an optimization technique called backpropagation could train multiple layers at once.

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

![AlexNet convolutional neural network architecture diagram illustrating layer splitting across two parallel Nvidia GTX 580 GPUs](/assets/images/ai/alexnet_architecture_2012.png "AlexNet Architecture (2012): Dual-GPU Convolutional Neural Network")

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

$$
\vec{v}_{\text{king}} - \vec{v}_{\text{man}} + \vec{v}_{\text{woman}} \approx \vec{v}_{\text{queen}}
$$

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

![The original Transformer encoder-decoder architecture diagram from the seminal 2017 Google paper Attention Is All You Need](/assets/images/ai/transformer_architecture_2017.png "The Transformer Architecture (2017): Attention Is All You Need")

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
