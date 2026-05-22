import { useState } from "react";

// ── Data ──────────────────────────────────────────────────────
const curriculum = [
  {
    id: 1,
    phase: "Phase 1",
    title: "Neural Network Foundations",
    color: "#4F46E5",
    light: "#EEF2FF",
    icon: "🧠",
    desc: "Master the mathematical and computational bedrock of all deep learning",
    topics: [
      {
        id: "p1t1", title: "The Perceptron", duration: "35 min", difficulty: "Beginner",
        summary: "The original artificial neuron — learn how a single unit can classify linearly separable data using a simple threshold function and weight update rule.",
        keyFormulas: ["z = W·X + b", "ŷ = step(z)", "wᵢ ← wᵢ + η·(y−ŷ)·xᵢ"],
        concepts: ["Weighted sum", "Step activation", "Learning rule", "Convergence theorem", "Linear separability", "Decision boundary"],
        practicalProblems: [
          { title: "AND / OR Gate Classifier", level: "Beginner", desc: "Implement a perceptron from scratch in NumPy to learn AND, OR logic gates. Verify it fails on XOR.", tags: ["NumPy", "Classification"] },
          { title: "Iris Binary Classifier", level: "Beginner", desc: "Use a perceptron to separate setosa vs non-setosa flowers from the Iris dataset. Plot the decision boundary.", tags: ["sklearn", "Visualization"] },
          { title: "Custom Perceptron Class", level: "Intermediate", desc: "Build a full Perceptron class with fit(), predict(), and a live convergence plot showing weight updates per epoch.", tags: ["OOP", "Matplotlib"] },
        ],
        interviewQs: [
          { q: "What is a perceptron and how does it learn?", a: "A perceptron is a linear binary classifier. It learns by comparing ŷ to y and updating weights by η·(y−ŷ)·x — only on misclassified samples." },
          { q: "Why can't a perceptron solve XOR?", a: "XOR is not linearly separable — no single hyperplane separates its four data points. The perceptron can only learn linear decision boundaries." },
          { q: "State the Perceptron Convergence Theorem.", a: "If training data is linearly separable, the perceptron learning algorithm converges in a finite number of steps." },
          { q: "What's the difference between a perceptron and logistic regression?", a: "Perceptron uses a hard step function and the perceptron update rule. Logistic regression uses sigmoid (smooth probability) and gradient descent on a proper loss function (BCE)." },
        ],
        resources: [
          { title: "Rosenblatt's Original 1957 Paper", url: "https://psycnet.apa.org/record/1959-09865-001", type: "Paper" },
          { title: "Stanford CS229 Notes — Perceptron", url: "https://cs229.stanford.edu/notes2022fall/cs229-notes6.pdf", type: "Notes" },
          { title: "3Blue1Brown — Neural Networks Ch.1", url: "https://www.youtube.com/watch?v=aircAruvnKk", type: "Video" },
          { title: "Sklearn Perceptron Docs", url: "https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.Perceptron.html", type: "Docs" },
        ]
      },
      {
        id: "p1t2", title: "Feedforward Neural Networks", duration: "55 min", difficulty: "Beginner",
        summary: "Stack multiple perceptrons with non-linear activations to achieve universal function approximation. Understand how depth and width shape representational power.",
        keyFormulas: ["zˡ = Wˡ·aˡ⁻¹ + bˡ", "aˡ = σ(zˡ)", "ŷ = aᴸ"],
        concepts: ["Multi-layer perceptron", "Universal approximation", "Hidden layers", "Non-linearity", "Parameter counting", "Width vs depth"],
        practicalProblems: [
          { title: "MNIST Digit Classifier", level: "Beginner", desc: "Build a 3-layer MLP in PyTorch that achieves >97% accuracy on MNIST. Track training/validation curves.", tags: ["PyTorch", "MNIST", "Classification"] },
          { title: "Boston Housing Regression", level: "Beginner", desc: "Use an MLP to predict house prices. Compare MSE at different network depths (1, 2, 3 hidden layers).", tags: ["Regression", "TensorFlow"] },
          { title: "XOR Solver — Prove Non-linearity Works", level: "Intermediate", desc: "Train a 2-2-1 MLP on XOR. Visualize how the hidden layer transforms the input space to make XOR linearly separable.", tags: ["Visualization", "NumPy"] },
          { title: "Neural Network from Scratch", level: "Advanced", desc: "Implement full MLP forward pass, backprop, and SGD in pure NumPy. Match PyTorch outputs exactly.", tags: ["NumPy", "Backprop"] },
        ],
        interviewQs: [
          { q: "What is the Universal Approximation Theorem?", a: "A feedforward network with one hidden layer and enough neurons can approximate any continuous function to arbitrary precision." },
          { q: "Why are non-linear activations essential in hidden layers?", a: "Without non-linearity, stacking layers gives W³(W²(W¹x)) = Wx — still just one linear transformation. Non-linearity enables the network to learn curved decision boundaries." },
          { q: "What is the difference between width and depth?", a: "Width = neurons per layer. Depth = number of layers. Depth enables hierarchical feature learning (edges→shapes→objects). Width increases capacity within a layer. Depth is generally more parameter-efficient." },
          { q: "How do you count parameters in an MLP?", a: "For each layer l: params = (input_size × output_size) + output_size (bias). Sum across all layers." },
        ],
        resources: [
          { title: "Deep Learning Book — Ch. 6 (Goodfellow)", url: "https://www.deeplearningbook.org/contents/mlp.html", type: "Book" },
          { title: "3Blue1Brown — Neural Networks Series", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi", type: "Video" },
          { title: "PyTorch nn.Linear Docs", url: "https://pytorch.org/docs/stable/generated/torch.nn.Linear.html", type: "Docs" },
          { title: "Michael Nielsen's Neural Networks Online Book", url: "http://neuralnetworksanddeeplearning.com/", type: "Book" },
        ]
      },
      {
        id: "p1t3", title: "Forward Propagation", duration: "30 min", difficulty: "Beginner",
        summary: "Deep-dive into the forward pass — how data flows through layers, what gets cached, and why the computational graph matters for backpropagation.",
        keyFormulas: ["zˡ = Wˡ·aˡ⁻¹ + bˡ", "aˡ = σ(zˡ)", "Cache: {zˡ, aˡ} for all l"],
        concepts: ["Layer-wise computation", "Computational graph", "Caching for backprop", "train() vs eval()", "Shape tracking", "Batch processing"],
        practicalProblems: [
          { title: "Shape Tracker Debugger", level: "Beginner", desc: "Given 5 broken MLP definitions with wrong shapes, fix them by printing tensor shapes at every layer.", tags: ["Debugging", "PyTorch"] },
          { title: "Manual Forward Pass", level: "Intermediate", desc: "Implement forward pass for a 3-layer network manually in NumPy. Verify outputs match PyTorch for the same weights.", tags: ["NumPy", "Verification"] },
          { title: "Inference Speed Benchmark", level: "Intermediate", desc: "Compare inference speed of model(x) with vs without torch.no_grad(). Measure memory usage too.", tags: ["Optimization", "Profiling"] },
        ],
        interviewQs: [
          { q: "What is the difference between forward pass at training vs inference?", a: "Training: builds computational graph, caches z and a at every layer, dropout active, BN uses batch stats. Inference: no graph, no caching (no_grad), dropout disabled, BN uses running stats." },
          { q: "Why do we cache z and a during forward propagation?", a: "Backpropagation needs these values to compute gradients. For example, dL/dW requires a^(l-1), and dL/db requires δˡ which uses σ'(zˡ)." },
          { q: "What does model.eval() actually change?", a: "It disables Dropout (all neurons active) and switches BatchNorm from batch statistics to stored running mean/variance. Critical for reproducible inference." },
        ],
        resources: [
          { title: "Karpathy's micrograd — Computational Graphs", url: "https://github.com/karpathy/micrograd", type: "GitHub" },
          { title: "PyTorch Autograd Tutorial", url: "https://pytorch.org/tutorials/beginner/basics/autogradqs_tutorial.html", type: "Docs" },
          { title: "CS231n Notes — Backprop & Forward Pass", url: "https://cs231n.github.io/optimization-2/", type: "Notes" },
        ]
      },
      {
        id: "p1t4", title: "Backpropagation", duration: "60 min", difficulty: "Intermediate",
        summary: "The engine of deep learning — understand how the chain rule efficiently computes gradients for every parameter in one backward pass.",
        keyFormulas: ["δᴸ = aᴸ − y", "δˡ = (Wˡ⁺¹)ᵀ·δˡ⁺¹ ⊙ σ'(zˡ)", "dL/dWˡ = δˡ·(aˡ⁻¹)ᵀ", "Wˡ ← Wˡ − η·dL/dWˡ"],
        concepts: ["Chain rule", "Gradient flow", "Delta vectors", "Computational graph traversal", "Autograd", "zero_grad()"],
        practicalProblems: [
          { title: "Backprop from Scratch", level: "Advanced", desc: "Implement full backprop for a 2-hidden-layer network in NumPy. Verify with PyTorch autograd — gradients must match to 6 decimal places.", tags: ["NumPy", "Verification"] },
          { title: "Gradient Check", level: "Intermediate", desc: "Implement numerical gradient checking (finite differences) to verify your backprop implementation.", tags: ["Debugging", "NumPy"] },
          { title: "Vanishing Gradient Detector", level: "Intermediate", desc: "Build a 10-layer sigmoid network. Plot gradient magnitudes at each layer during training. Observe vanishing gradients.", tags: ["PyTorch", "Visualization"] },
        ],
        interviewQs: [
          { q: "Explain backpropagation in simple terms.", a: "It computes how much each weight contributed to the prediction error, using the chain rule to propagate error signals backward from output to input through the computational graph." },
          { q: "Why must we call optimizer.zero_grad() before loss.backward()?", a: "PyTorch accumulates gradients by default — gradients are added to .grad on each backward call. Not zeroing causes incorrect (summed) gradients from multiple batches." },
          { q: "What is the computational complexity of backpropagation?", a: "O(same as forward pass) — roughly O(L × n²) for L layers with n neurons each. This is why backprop is efficient." },
        ],
        resources: [
          { title: "Karpathy's 'Spelled-out Intro to Backprop'", url: "https://www.youtube.com/watch?v=VMj-3S1tku0", type: "Video" },
          { title: "CS231n — Backpropagation Intuitions", url: "https://cs231n.github.io/optimization-2/", type: "Notes" },
          { title: "Deep Learning Book — Ch. 6.5 Backprop", url: "https://www.deeplearningbook.org/contents/mlp.html", type: "Book" },
        ]
      },
      {
        id: "p1t5", title: "Activation Functions", duration: "45 min", difficulty: "Beginner",
        summary: "Compare Sigmoid, Tanh, ReLU, Leaky ReLU, Softmax, and GELU — understand when to use each and why ReLU dominated deep networks while GELU rules Transformers.",
        keyFormulas: ["ReLU(z) = max(0,z)", "σ(z) = 1/(1+e⁻ᶻ)", "GELU(z) ≈ z·Φ(z)", "Softmax(zᵢ) = eᶻᵢ/Σeᶻⱼ"],
        concepts: ["Vanishing gradient problem", "Dying ReLU", "Saturation", "Smoothness", "Zero-centered", "Sparsity"],
        practicalProblems: [
          { title: "Activation Function Visualizer", level: "Beginner", desc: "Plot all 6 activation functions and their derivatives side by side. Annotate saturation zones and the ReLU kink.", tags: ["Matplotlib", "NumPy"] },
          { title: "Activation Ablation Study", level: "Intermediate", desc: "Train the same MLP on CIFAR-10 with Sigmoid, Tanh, ReLU, and GELU. Compare final accuracy and training speed.", tags: ["PyTorch", "Experiments"] },
          { title: "Dying ReLU Demo", level: "Intermediate", desc: "Trigger dying ReLU by using a large LR. Monitor the % of dead neurons per epoch. Fix with Leaky ReLU.", tags: ["PyTorch", "Debugging"] },
        ],
        interviewQs: [
          { q: "Why is ReLU better than sigmoid for deep networks?", a: "Sigmoid gradient ≤ 0.25 always; multiplied over L layers it vanishes exponentially. ReLU gradient is 1 for z>0 — no shrinkage — enabling gradients to reach early layers." },
          { q: "When would you choose sigmoid over ReLU?", a: "Only in the output layer for binary classification, where the output needs to be interpretable as a probability ∈ (0,1). Never in hidden layers of deep networks." },
          { q: "Why does GELU outperform ReLU in Transformers?", a: "GELU is smooth everywhere (differentiable at z=0), allows small negative activations (better gradient flow), and its stochastic interpretation is synergistic with attention mechanisms." },
        ],
        resources: [
          { title: "Activation Functions Survey (Dubey et al.)", url: "https://arxiv.org/abs/2109.14545", type: "Paper" },
          { title: "Distill.pub — Visualizing Neural Networks", url: "https://distill.pub/", type: "Interactive" },
          { title: "PyTorch Activations Documentation", url: "https://pytorch.org/docs/stable/nn.html#non-linear-activations-weighted-sum-nonlinearity", type: "Docs" },
        ]
      },
      {
        id: "p1t6", title: "Loss Functions", duration: "40 min", difficulty: "Beginner",
        summary: "Loss functions define what your model optimizes. Master BCE, Cross-Entropy, MSE, Huber, and KL Divergence — and know which to use for which task.",
        keyFormulas: ["BCE = −[y·log(ŷ)+(1−y)·log(1−ŷ)]", "CE = −Σy·log(ŷ)", "MSE = (1/n)Σ(y−ŷ)²"],
        concepts: ["Task-loss alignment", "Log-sum-exp trick", "Label smoothing", "Numerical stability", "Huber loss", "KL divergence"],
        practicalProblems: [
          { title: "Loss Landscape Explorer", level: "Beginner", desc: "For binary classification, plot BCE loss as a function of ŷ for y=0 and y=1. Observe asymptotic behavior.", tags: ["Matplotlib", "NumPy"] },
          { title: "Custom Loss Implementation", level: "Intermediate", desc: "Implement Focal Loss (Lin et al., 2017) for imbalanced classification. Compare with BCE on an imbalanced dataset.", tags: ["PyTorch", "Imbalanced data"] },
          { title: "Label Smoothing Experiment", level: "Intermediate", desc: "Train BERT-base on SST-2 with and without label smoothing (ε=0.1). Compare accuracy and calibration (ECE).", tags: ["HuggingFace", "NLP"] },
        ],
        interviewQs: [
          { q: "Why does PyTorch's CrossEntropyLoss expect raw logits, not softmax outputs?", a: "CrossEntropyLoss internally applies log-softmax using the numerically stable log-sum-exp trick. Applying softmax before it leads to log(softmax(x)) which has numerical instability." },
          { q: "MSE vs MAE — when to choose which?", a: "MSE: squared penalty — outliers dominate. Use when large errors are especially costly. MAE: linear penalty — robust to outliers. Use when your data has extreme values you don't want to over-penalize." },
        ],
        resources: [
          { title: "PyTorch Loss Functions", url: "https://pytorch.org/docs/stable/nn.html#loss-functions", type: "Docs" },
          { title: "Focal Loss Paper (Lin et al.)", url: "https://arxiv.org/abs/1708.02002", type: "Paper" },
          { title: "Label Smoothing — Müller et al.", url: "https://arxiv.org/abs/1906.02629", type: "Paper" },
        ]
      },
      {
        id: "p1t7", title: "Gradient Descent & Optimizers", duration: "50 min", difficulty: "Intermediate",
        summary: "From vanilla SGD to AdamW — understand how optimizers navigate the loss landscape, why momentum helps, and how adaptive learning rates changed deep learning.",
        keyFormulas: ["W ← W − η·∂L/∂W", "Adam: m̂/(√v̂+ε)", "AdamW: + decoupled λW"],
        concepts: ["Learning rate", "Momentum", "Adaptive LR", "Weight decay", "Warmup", "Cosine annealing"],
        practicalProblems: [
          { title: "Optimizer Comparison on Rosenbrock", level: "Intermediate", desc: "Run SGD, Momentum, RMSProp, Adam on the Rosenbrock banana function. Animate trajectories and compare convergence speed.", tags: ["NumPy", "Matplotlib", "Animation"] },
          { title: "LR Finder", level: "Intermediate", desc: "Implement the learning rate range test (Smith, 2017). Plot loss vs LR on CIFAR-10. Identify optimal LR range.", tags: ["PyTorch", "Training tricks"] },
          { title: "Transformer Training Setup", level: "Advanced", desc: "Implement AdamW + linear warmup + cosine decay for a Transformer from scratch. Train a small GPT on a text corpus.", tags: ["PyTorch", "Transformers"] },
        ],
        interviewQs: [
          { q: "What is the difference between Adam and AdamW?", a: "Adam adds weight decay to the gradient, which gets scaled by the adaptive learning rate. AdamW applies weight decay directly to weights, decoupled from gradient updates — the correct implementation of L2 regularization with adaptive optimizers." },
          { q: "Why might SGD+Momentum outperform Adam on some tasks?", a: "Adam adapts so aggressively that it finds sharp minima (poor generalization). SGD+Momentum tends to find flatter minima that generalize better, especially in image classification." },
        ],
        resources: [
          { title: "Adam Paper (Kingma & Ba)", url: "https://arxiv.org/abs/1412.6980", type: "Paper" },
          { title: "AdamW Paper (Loshchilov & Hutter)", url: "https://arxiv.org/abs/1711.05101", type: "Paper" },
          { title: "Sebastian Ruder — Overview of Optimizers", url: "https://www.ruder.io/optimizing-gradient-descent/", type: "Blog" },
          { title: "fastai Learning Rate Finder", url: "https://docs.fast.ai/callback.schedule.html#learner.lr_find", type: "Docs" },
        ]
      },
      {
        id: "p1t8", title: "Regularization & Batch Norm", duration: "45 min", difficulty: "Intermediate",
        summary: "Prevent overfitting with L2, Dropout, early stopping, and label smoothing. Stabilize training with Batch Normalization and understand when to use Layer Norm instead.",
        keyFormulas: ["L2: Loss + λΣwᵢ²", "x̂ᵢ = (xᵢ−μ)/√(σ²+ε)", "yᵢ = γ·x̂ᵢ + β"],
        concepts: ["Overfitting", "Bias-variance tradeoff", "Dropout ensemble", "Internal covariate shift", "Layer Norm vs Batch Norm", "Running statistics"],
        practicalProblems: [
          { title: "Regularization Ablation", level: "Beginner", desc: "Train a 5-layer MLP on a small dataset. Compare: no reg / L2 / Dropout / L2+Dropout. Plot train vs val loss curves.", tags: ["PyTorch", "Experiments"] },
          { title: "BatchNorm Deep Dive", level: "Intermediate", desc: "Implement BatchNorm1d from scratch in PyTorch. Verify γ, β, running mean, running var match nn.BatchNorm1d.", tags: ["PyTorch", "Implementation"] },
          { title: "Layer Norm for Sequences", level: "Intermediate", desc: "Implement LayerNorm for a Transformer encoder. Compare training stability with and without LayerNorm on a seq classification task.", tags: ["PyTorch", "Transformers"] },
        ],
        interviewQs: [
          { q: "What is the difference between Batch Norm and Layer Norm?", a: "Batch Norm normalizes across the batch dimension (per feature). Layer Norm normalizes across the feature dimension (per sample). BN requires batch size > 1; LN works for batch=1. Transformers use LN because sequence lengths vary." },
          { q: "What do γ and β do in Batch Normalization?", a: "Learnable scale (γ) and shift (β) allow the network to undo normalization if needed. After normalizing to mean=0, var=1, γ and β let the network find the optimal scale/shift for each feature." },
        ],
        resources: [
          { title: "Batch Normalization Paper (Ioffe & Szegedy)", url: "https://arxiv.org/abs/1502.03167", type: "Paper" },
          { title: "Layer Normalization Paper (Ba et al.)", url: "https://arxiv.org/abs/1607.06450", type: "Paper" },
          { title: "CS231n — Batch Normalization Notes", url: "https://cs231n.github.io/neural-networks-2/", type: "Notes" },
        ]
      },
    ]
  },
  {
    id: 2,
    phase: "Phase 2",
    title: "Sequential Deep Learning",
    color: "#059669",
    light: "#ECFDF5",
    icon: "🔁",
    desc: "Master recurrent architectures — from vanilla RNNs to LSTMs, GRUs, attention, and the complete Transformer",
    topics: [
      {
        id: "p2t1", title: "Embeddings", duration: "40 min", difficulty: "Beginner",
        summary: "Transform discrete tokens into dense semantic vectors. Learn Word2Vec, GloVe, and task-specific embeddings — and why the embedding layer is the entry point of every LLM.",
        keyFormulas: ["E ∈ ℝ^(V×d)", "e_i = E[i, :]", "Output: (batch, seq, d)"],
        concepts: ["Embedding matrix", "Semantic similarity", "Cosine similarity", "Pretrained embeddings", "Fine-tuning embeddings", "Subword embeddings"],
        practicalProblems: [
          { title: "Word2Vec from Scratch", level: "Intermediate", desc: "Implement Skip-gram Word2Vec in PyTorch on a text8 corpus. Visualize embeddings with t-SNE. Verify king−man+woman≈queen.", tags: ["PyTorch", "NLP", "t-SNE"] },
          { title: "Embedding Similarity Explorer", level: "Beginner", desc: "Load GloVe-100d embeddings. Build a nearest-neighbour lookup. Find top-10 similar words for any query.", tags: ["NumPy", "NLP"] },
          { title: "Fine-tuning vs Frozen Embeddings", level: "Intermediate", desc: "Compare sentiment classification accuracy with: random init, frozen GloVe, and fine-tuned GloVe embeddings.", tags: ["PyTorch", "Experiments"] },
        ],
        interviewQs: [
          { q: "What is the difference between one-hot encoding and embeddings?", a: "One-hot: sparse, high-dim (vocab size), no semantic relation between words. Embeddings: dense, low-dim (100-1024), learned to capture semantic similarity via co-occurrence patterns." },
          { q: "What does it mean for an embedding to be contextual?", a: "Static embeddings (Word2Vec, GloVe) give the same vector for 'bank' regardless of context. Contextual embeddings (BERT, GPT) produce different vectors for 'bank' (river) vs 'bank' (financial) based on surrounding tokens." },
        ],
        resources: [
          { title: "Word2Vec Original Paper", url: "https://arxiv.org/abs/1301.3781", type: "Paper" },
          { title: "GloVe: Global Vectors for Word Representation", url: "https://nlp.stanford.edu/projects/glove/", type: "Tool" },
          { title: "Jay Alammar — Illustrated Word2Vec", url: "https://jalammar.github.io/illustrated-word2vec/", type: "Blog" },
        ]
      },
      {
        id: "p2t2", title: "Vanilla RNN", duration: "45 min", difficulty: "Beginner",
        summary: "Understand the recurrent hidden state mechanism, parameter sharing across time, and the types of sequence-to-sequence problems RNNs can solve.",
        keyFormulas: ["hₜ = tanh(W_h·h_{t-1} + W_x·xₜ + b)", "Output: (batch, seq, hidden)"],
        concepts: ["Hidden state", "Parameter sharing", "Many-to-many", "Many-to-one", "One-to-many", "Sequential computation"],
        practicalProblems: [
          { title: "Character-Level Language Model", level: "Intermediate", desc: "Train a vanilla RNN to generate Shakespeare text character-by-character. Sample at temperatures 0.5, 1.0, 1.5.", tags: ["PyTorch", "Text Generation"] },
          { title: "Time Series Forecasting", level: "Beginner", desc: "Use an RNN to predict the next 5 values of a sine wave + noise. Compare with a simple MLP baseline.", tags: ["PyTorch", "Time Series"] },
          { title: "POS Tagging (Many-to-Many)", level: "Intermediate", desc: "Build an RNN to tag parts-of-speech for each word in a sentence. Evaluate on the Penn Treebank dataset.", tags: ["PyTorch", "NLP", "Tagging"] },
        ],
        interviewQs: [
          { q: "What is the hidden state in an RNN?", a: "A vector hₜ that summarizes all information from timesteps 1 to t. Computed as hₜ = tanh(W_h·h_{t-1} + W_x·xₜ + b). It is the 'memory' of the RNN." },
          { q: "Why does an RNN use the same weights at every timestep?", a: "Weight sharing allows: (1) processing sequences of any length, (2) generalizing patterns regardless of position, (3) fixed parameter count independent of sequence length." },
        ],
        resources: [
          { title: "Karpathy — The Unreasonable Effectiveness of RNNs", url: "https://karpathy.github.io/2015/05/21/rnn-effectiveness/", type: "Blog" },
          { title: "PyTorch RNN Tutorial", url: "https://pytorch.org/tutorials/intermediate/char_rnn_classification_tutorial.html", type: "Tutorial" },
        ]
      },
      {
        id: "p2t3", title: "BPTT & Vanishing Gradients", duration: "40 min", difficulty: "Intermediate",
        summary: "Why vanilla RNNs fail on long sequences — understand the mathematical root of vanishing and exploding gradients, and the engineering fixes.",
        keyFormulas: ["∂L/∂h₀ = ∂L/∂h_T · ∏(W_h·diag(tanh'))", "Clipping: g ← g·(max/‖g‖)"],
        concepts: ["BPTT", "Vanishing gradient", "Exploding gradient", "Gradient clipping", "Truncated BPTT", "Spectral radius"],
        practicalProblems: [
          { title: "Gradient Magnitude Tracker", level: "Intermediate", desc: "Train a 50-step vanilla RNN. Plot gradient L2 norm at each timestep. Observe exponential decay.", tags: ["PyTorch", "Visualization"] },
          { title: "Gradient Clipping Experiment", level: "Beginner", desc: "Induce gradient explosion with large weights. Fix with clip_grad_norm_. Compare training stability.", tags: ["PyTorch", "Training tricks"] },
          { title: "Long-Range Dependency Test", level: "Advanced", desc: "Design a synthetic task requiring memory of >100 steps. Compare RNN vs LSTM on this task. Show LSTM wins.", tags: ["PyTorch", "Experiments"] },
        ],
        interviewQs: [
          { q: "What is vanishing gradient and how does LSTM solve it?", a: "Vanilla RNN gradients are multiplied by W_h·tanh'(z) at every step. For long sequences this product → 0. LSTM's cell state has additive updates — ∂Cₜ/∂C_{t-1} = fₜ (the forget gate). When fₜ ≈ 1, gradients flow unchanged." },
          { q: "Why does gradient clipping work for exploding but not vanishing?", a: "Clipping scales down large gradients. It cannot amplify vanishingly small gradients — only structural solutions (LSTM, residual connections) fix vanishing." },
        ],
        resources: [
          { title: "Bengio et al. — On the difficulty of training RNNs", url: "https://arxiv.org/abs/1211.5063", type: "Paper" },
          { title: "Colah — Understanding LSTMs", url: "https://colah.github.io/posts/2015-08-Understanding-LSTMs/", type: "Blog" },
        ]
      },
      {
        id: "p2t4", title: "LSTM", duration: "60 min", difficulty: "Intermediate",
        summary: "The definitive solution to vanishing gradients. Master the four gates, cell state gradient highway, and why LSTM became the default sequence model for a decade.",
        keyFormulas: ["fₜ=σ(Wf·[h,x]+b)", "Cₜ=fₜ⊙C_{t-1}+iₜ⊙g̃ₜ", "hₜ=oₜ⊙tanh(Cₜ)"],
        concepts: ["Forget gate", "Input gate", "Cell gate", "Output gate", "Cell state highway", "Gradient flow"],
        practicalProblems: [
          { title: "Sentiment Analysis LSTM", level: "Beginner", desc: "Build an LSTM sentiment classifier on IMDb reviews. Use pretrained GloVe embeddings. Achieve >88% accuracy.", tags: ["PyTorch", "NLP", "Sentiment"] },
          { title: "Stock Price Forecasting", level: "Intermediate", desc: "Use a stacked 2-layer LSTM to predict next-day closing price from 60 days of OHLCV data.", tags: ["PyTorch", "Time Series", "Finance"] },
          { title: "LSTM from Scratch", level: "Advanced", desc: "Implement all 4 LSTM gates in NumPy. Verify forward pass and backward gradients match PyTorch nn.LSTMCell.", tags: ["NumPy", "Implementation"] },
        ],
        interviewQs: [
          { q: "What is the cell state and why is it important?", a: "Cₜ is a separate memory vector updated additively: Cₜ = f⊙C_{t-1} + i⊙g̃. This additive update means gradients flow backward as ∂Cₜ/∂C_{t-1} = fₜ (no matrix multiply, no tanh derivative) — the constant error carousel that solves vanishing gradients." },
          { q: "What does the forget gate learn to do?", a: "It learns to selectively erase cell memory. Example: reading 'Paris' → forget gate resets the previous city context stored in memory." },
        ],
        resources: [
          { title: "Original LSTM Paper (Hochreiter & Schmidhuber)", url: "https://www.bioinf.jku.at/publications/older/2604.pdf", type: "Paper" },
          { title: "Colah — Understanding LSTMs (Essential Read)", url: "https://colah.github.io/posts/2015-08-Understanding-LSTMs/", type: "Blog" },
          { title: "Illustrated Guide to LSTM (YouTube)", url: "https://www.youtube.com/watch?v=8HyCNIVRbSU", type: "Video" },
        ]
      },
      {
        id: "p2t5", title: "GRU & Bidirectional RNN", duration: "40 min", difficulty: "Intermediate",
        summary: "GRU: simplified LSTM with 2 gates. BiRNN: simultaneous forward+backward reading. Learn when to use each and the tradeoffs vs full LSTM.",
        keyFormulas: ["zₜ=σ(Wz·[h,x])", "hₜ=(1−zₜ)⊙h_{t-1}+zₜ⊙h̃ₜ", "BiRNN: [h→;h←]"],
        concepts: ["Update gate", "Reset gate", "Bidirectionality", "Future context", "Output doubling", "When to use BiRNN"],
        practicalProblems: [
          { title: "GRU vs LSTM Benchmark", level: "Intermediate", desc: "Compare GRU and LSTM on 3 tasks (short sequences, long sequences, time series). Measure accuracy, params, and training time.", tags: ["PyTorch", "Experiments"] },
          { title: "BiLSTM NER Tagger", level: "Intermediate", desc: "Build a BiLSTM + CRF Named Entity Recognition model on CoNLL-2003. The CRF ensures valid tag sequences.", tags: ["PyTorch", "NLP", "NER"] },
        ],
        interviewQs: [
          { q: "GRU vs LSTM — when would you choose each?", a: "GRU: 33% fewer params, faster, similar quality on most tasks. Start here. LSTM: better for very long sequences needing fine-grained, separate memory control. Use when GRU underperforms." },
          { q: "When should you NOT use a Bidirectional RNN?", a: "When future tokens are unavailable at inference: real-time speech recognition, streaming NLP, language modeling (GPT). BiRNN requires the full sequence upfront." },
        ],
        resources: [
          { title: "GRU Paper (Cho et al. 2014)", url: "https://arxiv.org/abs/1406.1078", type: "Paper" },
          { title: "Empirical Eval of RNNs (Chung et al.)", url: "https://arxiv.org/abs/1412.3555", type: "Paper" },
        ]
      },
      {
        id: "p2t6", title: "Seq2Seq & Attention", duration: "55 min", difficulty: "Intermediate",
        summary: "Encoder-decoder architecture for variable-length I/O, and the attention mechanism that solved the fixed-size bottleneck — the direct precursor to Transformers.",
        keyFormulas: ["cₜ = Σᵢ αᵢₜ·hᵢ", "αᵢₜ = softmax(score(sₜ,hᵢ))", "score = vᵀ·tanh(Wa·s+Ua·h)"],
        concepts: ["Context vector bottleneck", "Alignment scores", "Attention weights", "Bahdanau vs Luong", "Teacher forcing", "Beam search"],
        practicalProblems: [
          { title: "Neural Machine Translation", level: "Advanced", desc: "Build Seq2Seq+Bahdanau Attention for En→De translation on Multi30k. Visualize attention heatmaps.", tags: ["PyTorch", "NLP", "Translation"] },
          { title: "Attention Heatmap Visualizer", level: "Intermediate", desc: "After training Seq2Seq, extract attention weights and produce matplotlib heatmaps showing source-target alignment.", tags: ["Visualization", "NLP"] },
          { title: "Chatbot with Attention", level: "Intermediate", desc: "Build a Seq2Seq chatbot on Cornell Movie Dialogs corpus. Add attention and compare coherence with/without.", tags: ["PyTorch", "Chatbot"] },
        ],
        interviewQs: [
          { q: "What problem does attention solve in Seq2Seq?", a: "The fixed-size context vector bottleneck — one vector cannot represent a 50-word sentence. Attention gives the decoder dynamic access to all encoder hidden states via a learned weighted sum, scaling the context to any input length." },
          { q: "What is the computational complexity of attention?", a: "O(n²·d) where n=sequence length. Each position attends to all others. This is why Transformers scale poorly to very long sequences (documents, genomes)." },
        ],
        resources: [
          { title: "Bahdanau Attention Paper", url: "https://arxiv.org/abs/1409.0473", type: "Paper" },
          { title: "Jay Alammar — Visualizing Neural Machine Translation", url: "https://jalammar.github.io/visualizing-neural-machine-translation-mechanics-of-seq2seq-models-with-attention/", type: "Blog" },
        ]
      },
      {
        id: "p2t7", title: "The Transformer", duration: "90 min", difficulty: "Advanced",
        summary: "'Attention Is All You Need' — the complete architecture: multi-head self-attention, positional encoding, FFN, Add&Norm, masking, encoder, decoder, training and inference.",
        keyFormulas: ["Attention(Q,K,V) = Softmax(QKᵀ/√d_k)·V", "PE(pos,2i) = sin(pos/10000^(2i/d))"],
        concepts: ["Self-attention", "Multi-head attention", "Positional encoding", "Add & Norm", "Causal masking", "Encoder vs decoder"],
        practicalProblems: [
          { title: "Transformer from Scratch", level: "Advanced", desc: "Implement the full Transformer (encoder+decoder) for En→De translation from the Vaswani et al. paper specs. Match BLEU score.", tags: ["PyTorch", "NLP", "Paper Replication"] },
          { title: "GPT-nano Language Model", level: "Advanced", desc: "Follow Karpathy's minGPT. Train a decoder-only Transformer on Shakespeare. Generate coherent text.", tags: ["PyTorch", "GPT", "LLM"] },
          { title: "Attention Visualization", level: "Intermediate", desc: "Extract and visualize multi-head attention patterns from a trained BERT-base. Identify which heads learn syntax, coreference, positional patterns.", tags: ["HuggingFace", "Visualization"] },
          { title: "Positional Encoding Analysis", level: "Intermediate", desc: "Visualize the sinusoidal positional encoding matrix. Show that PE(pos+k) can be expressed as a linear function of PE(pos).", tags: ["NumPy", "Visualization"] },
        ],
        interviewQs: [
          { q: "Why did Transformers replace RNNs?", a: "(1) Fully parallelizable — all positions processed simultaneously. (2) Better long-range dependencies — O(1) path between any two positions vs O(n) for RNN. (3) Scale better — consistent power-law improvement with more data, compute, and parameters." },
          { q: "What is the role of the scaling factor 1/√d_k in attention?", a: "Dot products Q·K grow in magnitude with d_k. Large values push softmax into saturation → vanishing gradients. Scaling by 1/√d_k normalizes variance to ~1, keeping softmax in an informative gradient regime." },
          { q: "Encoder-only vs decoder-only vs encoder-decoder?", a: "Encoder-only (BERT): bidirectional, understanding tasks. Decoder-only (GPT): causal, generation tasks. Encoder-decoder (T5, BART): seq-to-seq tasks (translation, summarization)." },
        ],
        resources: [
          { title: "Attention Is All You Need (Original Paper)", url: "https://arxiv.org/abs/1706.03762", type: "Paper" },
          { title: "Jay Alammar — The Illustrated Transformer", url: "https://jalammar.github.io/illustrated-transformer/", type: "Blog" },
          { title: "Karpathy — Let's build GPT (Video)", url: "https://www.youtube.com/watch?v=kCc8FmEb1nY", type: "Video" },
          { title: "Harvard NLP — Annotated Transformer", url: "https://nlp.seas.harvard.edu/annotated-transformer/", type: "Tutorial" },
        ]
      },
    ]
  },
  {
    id: 3,
    phase: "Phase 3",
    title: "Modern NLP & Generative AI",
    color: "#DC2626",
    light: "#FFF5F5",
    icon: "🤖",
    desc: "BERT, GPT, LoRA, RAG, Vector Databases, and AI Agents — the full modern stack",
    topics: [
      {
        id: "p3t1", title: "Tokenization", duration: "35 min", difficulty: "Beginner",
        summary: "How text becomes numbers. BPE, WordPiece, special tokens — and why the tokenizer must always match the model.",
        keyFormulas: ["BPE: merge most frequent pairs", "1 word ≈ 1.3 GPT tokens"],
        concepts: ["BPE", "WordPiece", "Subword units", "OOV handling", "Special tokens", "Vocabulary size"],
        practicalProblems: [
          { title: "BPE from Scratch", level: "Intermediate", desc: "Implement BPE tokenization from scratch on a small corpus. Verify merge rules produce expected vocabulary.", tags: ["Python", "NLP"] },
          { title: "Tokenizer Comparison", level: "Beginner", desc: "Compare BERT, GPT-2, and T5 tokenizers on the same 10 sentences. Count tokens, observe subword splits.", tags: ["HuggingFace", "Analysis"] },
          { title: "Token Length Analyzer", level: "Beginner", desc: "For a dataset of legal documents, analyze token distribution. Find the optimal max_length for BERT fine-tuning.", tags: ["HuggingFace", "Data Analysis"] },
        ],
        interviewQs: [
          { q: "What is the OOV problem and how does BPE solve it?", a: "Out-of-vocabulary words get mapped to [UNK], losing all information. BPE splits unseen words into known subword pieces — 'unhappiness' → ['un', '##happiness'] — preserving partial meaning." },
          { q: "Why must you use the tokenizer that was paired with the model?", a: "Each model was pretrained with a specific vocabulary and tokenization scheme. Using a different tokenizer produces different token IDs, completely breaking the mapping between tokens and the model's learned embeddings." },
        ],
        resources: [
          { title: "HuggingFace Tokenizers Library", url: "https://huggingface.co/docs/tokenizers/", type: "Docs" },
          { title: "BPE Paper (Sennrich et al.)", url: "https://arxiv.org/abs/1508.07909", type: "Paper" },
          { title: "Tiktokenizer — Interactive BPE Explorer", url: "https://tiktokenizer.vercel.app/", type: "Interactive" },
        ]
      },
      {
        id: "p3t2", title: "BERT", duration: "60 min", difficulty: "Intermediate",
        summary: "Bidirectional Transformer pretraining with MLM and NSP. Fine-tune for classification, NER, QA, and sentence pairs with minimal task-specific architecture changes.",
        keyFormulas: ["MLM: 15% masked", "Input: [CLS]+tokens+[SEP]", "Fine-tune LR: 2e-5"],
        concepts: ["MLM", "NSP", "Bidirectionality", "CLS token", "Fine-tuning", "RoBERTa improvements"],
        practicalProblems: [
          { title: "BERT Sentiment Analysis", level: "Beginner", desc: "Fine-tune bert-base-uncased on SST-2. Beat baseline >93% accuracy with 3 epochs training.", tags: ["HuggingFace", "NLP", "Classification"] },
          { title: "BERT NER", level: "Intermediate", desc: "Fine-tune BERT for token-level NER on CoNLL-2003. Handle subword tokenization alignment carefully.", tags: ["HuggingFace", "NLP", "NER"] },
          { title: "BERT QA (Extractive)", level: "Intermediate", desc: "Fine-tune BERT on SQuAD 2.0 for span extraction QA. Evaluate Exact Match and F1.", tags: ["HuggingFace", "QA"] },
          { title: "BERT Embedding Analysis", level: "Intermediate", desc: "Extract BERT embeddings for the word 'bank' in 20 sentences. Use t-SNE to show contextual clustering.", tags: ["HuggingFace", "Visualization"] },
        ],
        interviewQs: [
          { q: "Why does BERT use [MASK] only 80% of the time during MLM?", a: "If [MASK] was used 100%, the model would never see real tokens at those positions during fine-tuning. The 10% random / 10% unchanged keeps the model robust to all token types at inference." },
          { q: "What is the key difference between BERT and RoBERTa?", a: "RoBERTa: removes NSP (shown unhelpful), trains longer on more data (160GB vs 16GB), uses larger batches, and dynamic masking (different mask pattern each epoch). Consistently 3-5% better." },
        ],
        resources: [
          { title: "BERT Paper (Devlin et al.)", url: "https://arxiv.org/abs/1810.04805", type: "Paper" },
          { title: "Jay Alammar — The Illustrated BERT", url: "https://jalammar.github.io/illustrated-bert/", type: "Blog" },
          { title: "HuggingFace BERT Fine-Tuning Tutorial", url: "https://huggingface.co/docs/transformers/training", type: "Tutorial" },
        ]
      },
      {
        id: "p3t3", title: "GPT & LLMs", duration: "70 min", difficulty: "Intermediate",
        summary: "Decoder-only autoregressive pretraining, the scaling laws, emergent abilities, decoding strategies, and the path from GPT-1 to GPT-4.",
        keyFormulas: ["CLM: P(xₜ|x₁...x_{t-1})", "Loss ∝ N^(-0.076)", "Temp: P_T = softmax(logits/T)"],
        concepts: ["Causal LM", "Scaling laws", "Emergent abilities", "Temperature", "Top-p sampling", "Beam search"],
        practicalProblems: [
          { title: "GPT-2 Text Generation", level: "Beginner", desc: "Use GPT-2 to generate text with different decoding strategies. Compare greedy, beam (k=5), top-p=0.9, temp=0.7.", tags: ["HuggingFace", "Generation"] },
          { title: "minGPT Training", level: "Advanced", desc: "Train Karpathy's minGPT on a custom dataset (e.g., Python code, recipes). Analyze token loss curves.", tags: ["PyTorch", "LLM", "Training"] },
          { title: "Scaling Law Experiment", level: "Advanced", desc: "Train the same GPT architecture at 3 sizes (1M, 10M, 100M params) on the same data. Plot loss vs compute. Verify power law.", tags: ["PyTorch", "Research"] },
        ],
        interviewQs: [
          { q: "What is the key architectural difference between BERT and GPT?", a: "BERT: bidirectional (no causal mask) — every token attends to all others. GPT: causal mask — position i only attends to positions ≤ i. BERT for understanding; GPT for generation." },
          { q: "What are emergent abilities in LLMs?", a: "Capabilities that appear unpredictably at certain scale thresholds — not present in smaller models, and not explicitly trained for. Examples: few-shot learning in GPT-3, chain-of-thought reasoning, arithmetic." },
        ],
        resources: [
          { title: "GPT-3 Paper (Brown et al.)", url: "https://arxiv.org/abs/2005.14165", type: "Paper" },
          { title: "Scaling Laws Paper (Kaplan et al.)", url: "https://arxiv.org/abs/2001.08361", type: "Paper" },
          { title: "Karpathy — Let's build GPT from scratch", url: "https://www.youtube.com/watch?v=kCc8FmEb1nY", type: "Video" },
          { title: "Chinchilla Scaling Laws (Hoffmann et al.)", url: "https://arxiv.org/abs/2203.15556", type: "Paper" },
        ]
      },
      {
        id: "p3t4", title: "Fine-Tuning & LoRA", duration: "65 min", difficulty: "Advanced",
        summary: "Full fine-tuning vs parameter-efficient methods. LoRA's low-rank decomposition, QLoRA, and the PEFT ecosystem for adapting 70B models on a single GPU.",
        keyFormulas: ["W = W₀ + BA (r≪d)", "Params: 4×H×(H+d+1)", "QLoRA: 4-bit + LoRA"],
        concepts: ["Transfer learning", "Full fine-tuning", "LoRA rank", "QLoRA", "PEFT", "Adapter layers"],
        practicalProblems: [
          { title: "LoRA Fine-Tuning on Custom Data", level: "Intermediate", desc: "Use PEFT to LoRA fine-tune Mistral-7B on a domain-specific QA dataset. r=8, target q_proj+v_proj.", tags: ["PEFT", "HuggingFace", "LLM"] },
          { title: "QLoRA on Consumer GPU", level: "Advanced", desc: "Fine-tune LLaMA-2-7B with QLoRA (4-bit NF4 + LoRA r=16) on a single RTX 3090. Evaluate perplexity before/after.", tags: ["BitsAndBytes", "PEFT", "QLoRA"] },
          { title: "LoRA Rank Ablation", level: "Intermediate", desc: "Fine-tune the same model with r=1,4,8,16,32. Plot accuracy vs trainable parameter count. Find the efficient frontier.", tags: ["PEFT", "Experiments"] },
        ],
        interviewQs: [
          { q: "Why does LoRA work? Why is low rank sufficient?", a: "The hypothesis is that the weight changes needed to adapt an LLM to a specific task lie in a low-dimensional subspace (low intrinsic dimensionality). Empirically, r=8-16 captures most adaptation signal for most tasks." },
          { q: "What is QLoRA and how does it differ from LoRA?", a: "QLoRA quantizes the frozen base model to 4-bit (NF4 format) while keeping LoRA adapters in float16. This allows fine-tuning a 65B model on a single 48GB GPU — reducing memory from ~130GB to ~40GB." },
        ],
        resources: [
          { title: "LoRA Paper (Hu et al.)", url: "https://arxiv.org/abs/2106.09685", type: "Paper" },
          { title: "QLoRA Paper (Dettmers et al.)", url: "https://arxiv.org/abs/2305.14314", type: "Paper" },
          { title: "HuggingFace PEFT Library", url: "https://github.com/huggingface/peft", type: "GitHub" },
          { title: "Tim Dettmers — LLM Fine-tuning Guide", url: "https://timdettmers.com/2023/01/30/which-gpu-for-deep-learning/", type: "Blog" },
        ]
      },
      {
        id: "p3t5", title: "RAG — Retrieval Augmented Generation", duration: "75 min", difficulty: "Advanced",
        summary: "Complete RAG pipeline: chunking strategies, embedding models, vector databases, hybrid search, reranking, and RAGAS evaluation.",
        keyFormulas: ["Hybrid: α·dense + (1−α)·sparse", "RRF: 1/(k+rank)", "Chunk: 256-512 tokens"],
        concepts: ["Chunking", "Dense retrieval", "BM25 sparse", "Reranking", "Cross-encoder", "RAGAS metrics"],
        practicalProblems: [
          { title: "RAG over a PDF", level: "Beginner", desc: "Build a RAG pipeline over a 200-page PDF using LangChain + Chroma + GPT-4o. Implement recursive chunking.", tags: ["LangChain", "Chroma", "OpenAI"] },
          { title: "Hybrid Search RAG", level: "Intermediate", desc: "Add BM25 sparse retrieval to a Chroma-based RAG system. Use Reciprocal Rank Fusion. Compare with pure dense.", tags: ["Qdrant", "BM25", "Hybrid"] },
          { title: "RAG Evaluation with RAGAS", level: "Intermediate", desc: "Evaluate your RAG pipeline using RAGAS: faithfulness, answer relevance, context precision, context recall.", tags: ["RAGAS", "Evaluation"] },
          { title: "Advanced RAG — Reranking", level: "Advanced", desc: "Add a cross-encoder reranker (ms-marco-MiniLM-L-6-v2) on top-20 retrieved chunks. Show improved precision.", tags: ["Sentence Transformers", "Reranking"] },
        ],
        interviewQs: [
          { q: "RAG vs Fine-tuning — when to use which?", a: "RAG: dynamic/private knowledge, need citations, quick to update (just re-index). Fine-tuning: change behavior/style, stable domain knowledge, latency-critical. Best combo: fine-tune for style + RAG for facts." },
          { q: "What is hybrid search and why does it outperform pure dense?", a: "Hybrid combines dense (semantic similarity, catches paraphrases) with sparse BM25 (exact keyword match, catches names/codes). Dense misses exact terms; sparse misses paraphrases. Combining beats either alone." },
        ],
        resources: [
          { title: "RAG Paper (Lewis et al.)", url: "https://arxiv.org/abs/2005.11401", type: "Paper" },
          { title: "LangChain RAG Tutorial", url: "https://python.langchain.com/docs/use_cases/question_answering/", type: "Tutorial" },
          { title: "RAGAS Evaluation Framework", url: "https://github.com/explodinggradients/ragas", type: "GitHub" },
          { title: "Pinecone — RAG Guide", url: "https://www.pinecone.io/learn/retrieval-augmented-generation/", type: "Blog" },
        ]
      },
      {
        id: "p3t6", title: "Vector Databases & AI Agents", duration: "70 min", difficulty: "Advanced",
        summary: "ANN indexing with HNSW, vector DB comparison, and autonomous AI agents with tools, memory, planning, and multi-agent orchestration.",
        keyFormulas: ["cosine(A,B) = A·B/(‖A‖‖B‖)", "HNSW: O(log n) query"],
        concepts: ["HNSW", "FAISS", "Metadata filtering", "ReAct pattern", "Tool use", "Multi-agent", "Function calling"],
        practicalProblems: [
          { title: "FAISS Index Builder", level: "Beginner", desc: "Build a FAISS flat IP index over 100K Wikipedia embeddings. Benchmark query speed vs brute force cosine.", tags: ["FAISS", "NumPy", "Benchmarking"] },
          { title: "ReAct Agent from Scratch", level: "Intermediate", desc: "Build a ReAct agent with web search + calculator tools using OpenAI function calling. Solve 5 multi-step reasoning tasks.", tags: ["OpenAI", "LangChain", "Agents"] },
          { title: "Multi-Agent Research System", level: "Advanced", desc: "Build a 3-agent system: Researcher (search) → Analyst (synthesize) → Writer (draft). Use LangGraph for orchestration.", tags: ["LangGraph", "Multi-agent"] },
          { title: "Agent with Long-Term Memory", level: "Advanced", desc: "Build an agent that persists facts across sessions using a vector DB. Test recall of facts from 10+ turns ago.", tags: ["LangChain", "Qdrant", "Memory"] },
        ],
        interviewQs: [
          { q: "What is the difference between a chain and an agent?", a: "A chain is a fixed, predetermined sequence of LLM calls. An agent uses an LLM to dynamically decide which tools to call in what order based on observations, iterating until the goal is achieved." },
          { q: "What are common agent failure modes?", a: "(1) Hallucinating tool calls — inventing function names/arguments. (2) Infinite planning loops. (3) Context overflow. (4) Tool misuse. (5) Poor task decomposition. Mitigations: strict JSON schemas, max steps, summarization." },
        ],
        resources: [
          { title: "ReAct Paper (Yao et al.)", url: "https://arxiv.org/abs/2210.03629", type: "Paper" },
          { title: "LangGraph Documentation", url: "https://langchain-ai.github.io/langgraph/", type: "Docs" },
          { title: "Weaviate — Vector Database Guide", url: "https://weaviate.io/developers/weaviate", type: "Docs" },
          { title: "Lilian Weng — LLM-powered Agents", url: "https://lilianweng.github.io/posts/2023-06-23-agent/", type: "Blog" },
        ]
      },
    ]
  }
];

const difficultyColor = { Beginner: "#059669", Intermediate: "#D97706", Advanced: "#DC2626" };
const difficultyBg = { Beginner: "#ECFDF5", Intermediate: "#FFFBEB", Advanced: "#FFF1F2" };
const resourceTypeIcon = { Paper: "📄", Blog: "✍️", Video: "🎬", Docs: "📚", Tutorial: "🧪", GitHub: "💻", Book: "📖", Notes: "📝", Tool: "🔧", Interactive: "🎮" };

// ── Main App ──────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("home"); // home | phase | topic
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [topicTab, setTopicTab] = useState("overview");
  const [progress, setProgress] = useState({});
  const [searchQ, setSearchQ] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const totalTopics = curriculum.reduce((a, p) => a + p.topics.length, 0);
  const completedCount = Object.values(progress).filter(Boolean).length;
  const progressPct = Math.round((completedCount / totalTopics) * 100);

  function openTopic(phase, topic) {
    setSelectedPhase(phase);
    setSelectedTopic(topic);
    setTopicTab("overview");
    setView("topic");
    setSidebarOpen(false);
    window.scrollTo(0, 0);
  }

  function openPhase(phase) {
    setSelectedPhase(phase);
    setView("phase");
    window.scrollTo(0, 0);
  }

  const allTopicsFlat = curriculum.flatMap(p => p.topics.map(t => ({ ...t, phase: p })));
  const searchResults = searchQ.trim().length > 1
    ? allTopicsFlat.filter(t =>
        t.title.toLowerCase().includes(searchQ.toLowerCase()) ||
        t.concepts.some(c => c.toLowerCase().includes(searchQ.toLowerCase()))
      )
    : [];

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: "#0F1117", minHeight: "100vh", color: "#E8EAF0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #1A1D27; } ::-webkit-scrollbar-thumb { background: #2D3148; border-radius: 3px; }
        .pill { display:inline-flex; align-items:center; gap:5px; padding:3px 10px; border-radius:20px; font-size:11px; font-weight:600; letter-spacing:.4px; }
        .hover-card { transition: transform .18s, box-shadow .18s; cursor:pointer; } .hover-card:hover { transform:translateY(-2px); box-shadow:0 8px 32px rgba(0,0,0,.45); }
        .tab-btn { padding:8px 18px; border-radius:8px; border:none; cursor:pointer; font-size:13px; font-weight:500; transition:all .15s; }
        .tab-active { background:#4F46E5; color:#fff; }
        .tab-inactive { background:transparent; color:#9CA3AF; }
        .tab-inactive:hover { background:#1E2235; color:#E8EAF0; }
        .res-link { display:flex; align-items:center; gap:10px; padding:10px 14px; border-radius:10px; background:#1A1D27; border:1px solid #2D3148; text-decoration:none; color:#E8EAF0; transition:all .15s; margin-bottom:8px; }
        .res-link:hover { background:#222640; border-color:#4F46E5; }
        .q-card { background:#14172B; border:1px solid #252840; border-radius:12px; padding:16px; margin-bottom:10px; }
        .prob-card { background:#14172B; border:1px solid #252840; border-radius:12px; padding:16px; margin-bottom:10px; transition:border-color .15s; }
        .prob-card:hover { border-color:#4F46E5; }
        .sidebar-item { padding:8px 12px; border-radius:8px; cursor:pointer; font-size:13px; display:flex; align-items:center; gap:8px; transition:all .15s; }
        .sidebar-item:hover { background:#1E2235; }
        .sidebar-item.active { background:#1E2235; color:#818CF8; }
        input[type=search], input[type=text] { background:#1A1D27; border:1px solid #2D3148; border-radius:10px; color:#E8EAF0; padding:10px 14px; font-size:14px; outline:none; transition:border .15s; }
        input:focus { border-color:#4F46E5; }
        .formula-chip { display:inline-block; padding:4px 10px; background:#0D1025; border:1px solid #2D3148; border-radius:6px; font-family:'JetBrains Mono',monospace; font-size:12px; color:#A5B4FC; margin:3px; }
        .concept-chip { display:inline-block; padding:3px 10px; background:#1E2235; border-radius:20px; font-size:11px; color:#9CA3AF; margin:3px; }
        .nav-btn { padding:8px 16px; border-radius:8px; border:1px solid #2D3148; background:transparent; color:#9CA3AF; cursor:pointer; font-size:13px; transition:all .15s; }
        .nav-btn:hover { background:#1E2235; color:#E8EAF0; }
        .progress-bar-bg { background:#1A1D27; border-radius:99px; height:6px; width:100%; }
        .done-badge { width:20px;height:20px;border-radius:50%;background:#059669;display:inline-flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0; }
      `}</style>

      {/* Top Nav */}
      <nav style={{ background:"#0F1117", borderBottom:"1px solid #1E2235", position:"sticky", top:0, zIndex:100, padding:"0 24px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", height:58 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <button onClick={() => setSidebarOpen(o => !o)} style={{ background:"none", border:"none", color:"#9CA3AF", cursor:"pointer", fontSize:20 }}>☰</button>
            <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:18, color:"#E8EAF0", cursor:"pointer" }} onClick={() => setView("home")}>
              <span style={{ color:"#818CF8" }}>Deep</span>Learn
            </span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <input type="search" placeholder="Search topics…" value={searchQ} onChange={e => setSearchQ(e.target.value)} style={{ width:200 }} />
            <div style={{ fontSize:12, color:"#6B7280", whiteSpace:"nowrap" }}>
              <span style={{ color:"#818CF8", fontWeight:600 }}>{completedCount}</span>/{totalTopics} complete
            </div>
          </div>
        </div>
        {/* Search results dropdown */}
        {searchResults.length > 0 && (
          <div style={{ position:"absolute", top:58, right:24, background:"#1A1D27", border:"1px solid #2D3148", borderRadius:10, width:320, zIndex:200, overflow:"hidden" }}>
            {searchResults.slice(0,6).map(t => (
              <div key={t.id} onClick={() => { openTopic(t.phase, t); setSearchQ(""); }} style={{ padding:"10px 14px", cursor:"pointer", borderBottom:"1px solid #2D3148", fontSize:13 }}
                onMouseEnter={e => e.currentTarget.style.background="#222640"}
                onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                <div style={{ fontWeight:500 }}>{t.title}</div>
                <div style={{ fontSize:11, color:"#6B7280" }}>{t.phase.phase} · {t.phase.title}</div>
              </div>
            ))}
          </div>
        )}
      </nav>

      {/* Sidebar */}
      {sidebarOpen && (
        <div style={{ position:"fixed", inset:0, zIndex:150, display:"flex" }}>
          <div style={{ width:280, background:"#0D0F1A", borderRight:"1px solid #1E2235", overflowY:"auto", padding:"20px 12px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20, padding:"0 8px" }}>
              <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:16, color:"#E8EAF0" }}>Curriculum</span>
              <button onClick={() => setSidebarOpen(false)} style={{ background:"none", border:"none", color:"#6B7280", cursor:"pointer", fontSize:18 }}>✕</button>
            </div>
            {/* Progress */}
            <div style={{ padding:"10px 8px", marginBottom:16 }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:"#6B7280", marginBottom:6 }}>
                <span>Overall Progress</span><span style={{ color:"#818CF8" }}>{progressPct}%</span>
              </div>
              <div className="progress-bar-bg"><div style={{ height:"100%", borderRadius:99, background:"linear-gradient(90deg,#4F46E5,#818CF8)", width:`${progressPct}%`, transition:"width .4s" }} /></div>
            </div>
            {curriculum.map(phase => (
              <div key={phase.id} style={{ marginBottom:16 }}>
                <div onClick={() => { openPhase(phase); setSidebarOpen(false); }} style={{ padding:"8px 8px", cursor:"pointer", marginBottom:4 }}>
                  <div style={{ fontSize:11, fontWeight:600, color:phase.color, letterSpacing:.5, textTransform:"uppercase" }}>{phase.phase}</div>
                  <div style={{ fontSize:13, fontWeight:500, color:"#E8EAF0" }}>{phase.title}</div>
                </div>
                {phase.topics.map(t => (
                  <div key={t.id} className={`sidebar-item ${selectedTopic?.id === t.id ? "active" : ""}`} onClick={() => openTopic(phase, t)}>
                    {progress[t.id] ? <span className="done-badge">✓</span> : <span style={{ width:20, height:20, borderRadius:"50%", border:"1.5px solid #2D3148", display:"inline-flex", flexShrink:0 }} />}
                    <span style={{ flex:1 }}>{t.title}</span>
                    <span style={{ fontSize:10, color:"#4B5563" }}>{t.duration}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ flex:1, background:"rgba(0,0,0,.5)", backdropFilter:"blur(2px)" }} onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* VIEWS */}
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px" }}>

        {/* ── HOME ─────────────────────────────── */}
        {view === "home" && (
          <div>
            {/* Hero */}
            <div style={{ textAlign:"center", padding:"72px 0 48px" }}>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:54, fontWeight:700, lineHeight:1.1, marginBottom:16 }}>
                <span style={{ color:"#818CF8" }}>Master Deep Learning</span><br/>
                <span style={{ color:"#E8EAF0" }}>from Neurons to Agents</span>
              </div>
              <p style={{ fontSize:17, color:"#9CA3AF", maxWidth:560, margin:"0 auto 32px", lineHeight:1.65 }}>
                A complete learning system with hands-on problems, interview prep, curated resources, and progress tracking — across 3 phases and {totalTopics} topics.
              </p>
              <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
                <button onClick={() => openPhase(curriculum[0])} style={{ padding:"12px 28px", background:"#4F46E5", border:"none", borderRadius:10, color:"#fff", fontWeight:600, fontSize:15, cursor:"pointer" }}>
                  Start Learning →
                </button>
                <button onClick={() => setSidebarOpen(true)} style={{ padding:"12px 28px", background:"transparent", border:"1px solid #2D3148", borderRadius:10, color:"#E8EAF0", fontWeight:500, fontSize:15, cursor:"pointer" }}>
                  Browse Curriculum
                </button>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(160px,1fr))", gap:16, marginBottom:56 }}>
              {[
                { n:3, label:"Phases" }, { n:totalTopics, label:"Topics" },
                { n:curriculum.reduce((a,p)=>a+p.topics.reduce((b,t)=>b+t.practicalProblems.length,0),0), label:"Hands-on Problems" },
                { n:curriculum.reduce((a,p)=>a+p.topics.reduce((b,t)=>b+t.interviewQs.length,0),0), label:"Interview Q&As" },
                { n:curriculum.reduce((a,p)=>a+p.topics.reduce((b,t)=>b+t.resources.length,0),0), label:"Curated Resources" },
              ].map(s => (
                <div key={s.label} style={{ background:"#14172B", border:"1px solid #1E2235", borderRadius:14, padding:"20px 16px", textAlign:"center" }}>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:34, fontWeight:700, color:"#818CF8" }}>{s.n}</div>
                  <div style={{ fontSize:13, color:"#6B7280", marginTop:4 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Phases */}
            <div style={{ marginBottom:64 }}>
              <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:26, fontWeight:700, marginBottom:28, color:"#E8EAF0" }}>Learning Phases</h2>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))", gap:20 }}>
                {curriculum.map(phase => {
                  const done = phase.topics.filter(t => progress[t.id]).length;
                  const pct = Math.round((done / phase.topics.length) * 100);
                  return (
                    <div key={phase.id} className="hover-card" onClick={() => openPhase(phase)}
                      style={{ background:"#14172B", border:"1px solid #1E2235", borderRadius:16, padding:24, cursor:"pointer" }}>
                      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:16 }}>
                        <div>
                          <span style={{ fontSize:11, fontWeight:700, color:phase.color, letterSpacing:.6, textTransform:"uppercase" }}>{phase.phase}</span>
                          <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:20, fontWeight:700, color:"#E8EAF0", marginTop:4 }}>{phase.title}</div>
                        </div>
                        <span style={{ fontSize:32 }}>{phase.icon}</span>
                      </div>
                      <p style={{ fontSize:13, color:"#6B7280", lineHeight:1.6, marginBottom:16 }}>{phase.desc}</p>
                      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:16 }}>
                        {phase.topics.slice(0,5).map(t => (
                          <span key={t.id} style={{ fontSize:11, padding:"2px 8px", background:"#1E2235", borderRadius:20, color:"#9CA3AF" }}>{t.title}</span>
                        ))}
                        {phase.topics.length > 5 && <span style={{ fontSize:11, color:"#4B5563" }}>+{phase.topics.length-5} more</span>}
                      </div>
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                        <div className="progress-bar-bg" style={{ flex:1, marginRight:12 }}>
                          <div style={{ height:"100%", borderRadius:99, background:phase.color, width:`${pct}%`, transition:"width .4s" }} />
                        </div>
                        <span style={{ fontSize:12, color:"#6B7280", whiteSpace:"nowrap" }}>{done}/{phase.topics.length} topics</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Evolution timeline */}
            <div style={{ background:"#14172B", border:"1px solid #1E2235", borderRadius:16, padding:28, marginBottom:64 }}>
              <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:20, fontWeight:700, marginBottom:20, color:"#E8EAF0" }}>The Learning Arc</h2>
              <div style={{ overflowX:"auto" }}>
                <div style={{ display:"flex", alignItems:"center", gap:0, minWidth:700, padding:"8px 0" }}>
                  {[
                    { label:"Perceptron", year:"1957", color:"#4F46E5" },
                    { label:"Backprop", year:"1986", color:"#4F46E5" },
                    { label:"LSTM", year:"1997", color:"#059669" },
                    { label:"Seq2Seq", year:"2014", color:"#059669" },
                    { label:"Attention", year:"2015", color:"#059669" },
                    { label:"Transformer", year:"2017", color:"#DC2626" },
                    { label:"BERT/GPT", year:"2018", color:"#DC2626" },
                    { label:"LoRA/RAG", year:"2020+", color:"#DC2626" },
                    { label:"Agents", year:"2023+", color:"#DC2626" },
                  ].map((n, i, arr) => (
                    <div key={n.label} style={{ display:"flex", alignItems:"center", flex:i<arr.length-1?1:"auto" }}>
                      <div style={{ textAlign:"center", flex:"0 0 auto" }}>
                        <div style={{ width:10, height:10, borderRadius:"50%", background:n.color, margin:"0 auto 5px" }} />
                        <div style={{ fontSize:10, fontWeight:600, color:n.color, whiteSpace:"nowrap" }}>{n.label}</div>
                        <div style={{ fontSize:9, color:"#4B5563" }}>{n.year}</div>
                      </div>
                      {i < arr.length-1 && <div style={{ flex:1, height:1, background:"#2D3148", margin:"0 6px", marginTop:-16 }} />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── PHASE VIEW ─────────────────────────── */}
        {view === "phase" && selectedPhase && (
          <div style={{ paddingTop:32 }}>
            <button className="nav-btn" onClick={() => setView("home")} style={{ marginBottom:24 }}>← Back</button>
            <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:8 }}>
              <span style={{ fontSize:40 }}>{selectedPhase.icon}</span>
              <div>
                <span style={{ fontSize:12, fontWeight:700, color:selectedPhase.color, letterSpacing:.6, textTransform:"uppercase" }}>{selectedPhase.phase}</span>
                <h1 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:32, fontWeight:700, color:"#E8EAF0" }}>{selectedPhase.title}</h1>
              </div>
            </div>
            <p style={{ fontSize:15, color:"#9CA3AF", marginBottom:36, lineHeight:1.65 }}>{selectedPhase.desc}</p>

            <div style={{ display:"grid", gap:14 }}>
              {selectedPhase.topics.map((t, i) => {
                const done = progress[t.id];
                return (
                  <div key={t.id} className="hover-card" onClick={() => openTopic(selectedPhase, t)}
                    style={{ background:"#14172B", border:`1px solid ${done?"#059669":"#1E2235"}`, borderRadius:14, padding:"20px 22px", display:"flex", alignItems:"center", gap:16 }}>
                    <div style={{ width:36, height:36, borderRadius:10, background:`${selectedPhase.color}22`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, color:selectedPhase.color, fontSize:15 }}>{i+1}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4, flexWrap:"wrap" }}>
                        <span style={{ fontWeight:600, fontSize:15, color:"#E8EAF0" }}>{t.title}</span>
                        <span className="pill" style={{ background:difficultyBg[t.difficulty], color:difficultyColor[t.difficulty] }}>{t.difficulty}</span>
                      </div>
                      <p style={{ fontSize:13, color:"#6B7280", lineHeight:1.5, marginBottom:8 }}>{t.summary.slice(0,100)}…</p>
                      <div style={{ display:"flex", gap:16, fontSize:12, color:"#4B5563" }}>
                        <span>⏱ {t.duration}</span>
                        <span>🧪 {t.practicalProblems.length} problems</span>
                        <span>🎯 {t.interviewQs.length} Q&As</span>
                        <span>🔗 {t.resources.length} resources</span>
                      </div>
                    </div>
                    {done && <span className="done-badge">✓</span>}
                    <span style={{ color:"#4B5563", fontSize:18 }}>›</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── TOPIC VIEW ─────────────────────────── */}
        {view === "topic" && selectedTopic && selectedPhase && (
          <div style={{ paddingTop:32, paddingBottom:80 }}>
            {/* Breadcrumb */}
            <div style={{ display:"flex", gap:8, fontSize:13, color:"#4B5563", marginBottom:20, alignItems:"center" }}>
              <span style={{ cursor:"pointer", color:"#9CA3AF" }} onClick={() => setView("home")}>Home</span>
              <span>›</span>
              <span style={{ cursor:"pointer", color:"#9CA3AF" }} onClick={() => setView("phase")}>{selectedPhase.phase}</span>
              <span>›</span>
              <span style={{ color:"#E8EAF0" }}>{selectedTopic.title}</span>
            </div>

            {/* Topic header */}
            <div style={{ background:"#14172B", border:"1px solid #1E2235", borderRadius:16, padding:"24px 28px", marginBottom:24 }}>
              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", gap:8, marginBottom:10, flexWrap:"wrap" }}>
                    <span className="pill" style={{ background:`${selectedPhase.color}22`, color:selectedPhase.color }}>{selectedPhase.phase}</span>
                    <span className="pill" style={{ background:difficultyBg[selectedTopic.difficulty], color:difficultyColor[selectedTopic.difficulty] }}>{selectedTopic.difficulty}</span>
                    <span style={{ fontSize:12, color:"#4B5563" }}>⏱ {selectedTopic.duration}</span>
                  </div>
                  <h1 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:28, fontWeight:700, color:"#E8EAF0", marginBottom:10 }}>{selectedTopic.title}</h1>
                  <p style={{ fontSize:14, color:"#9CA3AF", lineHeight:1.65 }}>{selectedTopic.summary}</p>
                </div>
                <button onClick={() => { setProgress(p => ({ ...p, [selectedTopic.id]: !p[selectedTopic.id] })); }}
                  style={{ padding:"10px 20px", borderRadius:10, border:"none", cursor:"pointer", fontWeight:600, fontSize:13,
                    background: progress[selectedTopic.id] ? "#059669" : "#4F46E5", color:"#fff", flexShrink:0 }}>
                  {progress[selectedTopic.id] ? "✓ Completed" : "Mark Complete"}
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display:"flex", gap:6, marginBottom:24, overflowX:"auto", padding:"2px 0" }}>
              {[
                { id:"overview", label:"📖 Overview" },
                { id:"problems", label:"🧪 Hands-on Problems" },
                { id:"interview", label:"🎯 Interview Q&A" },
                { id:"resources", label:"🔗 Resources" },
              ].map(tab => (
                <button key={tab.id} className={`tab-btn ${topicTab === tab.id ? "tab-active" : "tab-inactive"}`}
                  onClick={() => setTopicTab(tab.id)} style={{ whiteSpace:"nowrap" }}>{tab.label}</button>
              ))}
            </div>

            {/* Tab: Overview */}
            {topicTab === "overview" && (
              <div style={{ display:"grid", gap:20 }}>
                {/* Key Formulas */}
                <div style={{ background:"#14172B", border:"1px solid #1E2235", borderRadius:14, padding:"20px 22px" }}>
                  <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:15, fontWeight:700, color:"#E8EAF0", marginBottom:14, display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ color:"#818CF8" }}>∑</span> Key Formulas
                  </h3>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                    {selectedTopic.keyFormulas.map(f => <span key={f} className="formula-chip">{f}</span>)}
                  </div>
                </div>
                {/* Core Concepts */}
                <div style={{ background:"#14172B", border:"1px solid #1E2235", borderRadius:14, padding:"20px 22px" }}>
                  <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:15, fontWeight:700, color:"#E8EAF0", marginBottom:14 }}>
                    🧩 Core Concepts
                  </h3>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                    {selectedTopic.concepts.map(c => <span key={c} className="concept-chip">{c}</span>)}
                  </div>
                </div>
                {/* Quick stats row */}
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:12 }}>
                  {[
                    { n:selectedTopic.practicalProblems.length, label:"Problems", icon:"🧪" },
                    { n:selectedTopic.interviewQs.length, label:"Interview Qs", icon:"🎯" },
                    { n:selectedTopic.resources.length, label:"Resources", icon:"🔗" },
                    { n:selectedTopic.keyFormulas.length, label:"Formulas", icon:"∑" },
                  ].map(s => (
                    <div key={s.label} style={{ background:"#0F1117", border:"1px solid #1E2235", borderRadius:12, padding:"14px", textAlign:"center" }}>
                      <div style={{ fontSize:22, marginBottom:4 }}>{s.icon}</div>
                      <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:24, fontWeight:700, color:"#818CF8" }}>{s.n}</div>
                      <div style={{ fontSize:12, color:"#4B5563" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                {/* Preview of problems */}
                <div style={{ background:"#14172B", border:"1px solid #1E2235", borderRadius:14, padding:"20px 22px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                    <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:15, fontWeight:700, color:"#E8EAF0" }}>🧪 Practice Problems Preview</h3>
                    <button className="nav-btn" style={{ fontSize:12 }} onClick={() => setTopicTab("problems")}>See all →</button>
                  </div>
                  {selectedTopic.practicalProblems.slice(0,2).map(p => (
                    <div key={p.title} className="prob-card">
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                        <span className="pill" style={{ background:difficultyBg[p.level], color:difficultyColor[p.level] }}>{p.level}</span>
                        <span style={{ fontWeight:600, fontSize:14, color:"#E8EAF0" }}>{p.title}</span>
                      </div>
                      <p style={{ fontSize:13, color:"#6B7280", lineHeight:1.5 }}>{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Problems */}
            {topicTab === "problems" && (
              <div>
                <p style={{ fontSize:14, color:"#9CA3AF", marginBottom:20, lineHeight:1.6 }}>
                  Hands-on problems ranging from beginner implementations to advanced research-level challenges. Each problem is self-contained and buildable in a notebook.
                </p>
                {selectedTopic.practicalProblems.map((prob, i) => (
                  <div key={i} className="prob-card">
                    <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:8, gap:12 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                        <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:15, color:"#E8EAF0" }}>
                          {i+1}. {prob.title}
                        </span>
                        <span className="pill" style={{ background:difficultyBg[prob.level], color:difficultyColor[prob.level] }}>{prob.level}</span>
                      </div>
                    </div>
                    <p style={{ fontSize:14, color:"#9CA3AF", lineHeight:1.6, marginBottom:12 }}>{prob.desc}</p>
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                      {prob.tags.map(tag => (
                        <span key={tag} style={{ fontSize:11, padding:"2px 8px", background:"#0D1025", border:"1px solid #2D3148", borderRadius:6, color:"#818CF8", fontFamily:"'JetBrains Mono',monospace" }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab: Interview */}
            {topicTab === "interview" && (
              <div>
                <p style={{ fontSize:14, color:"#9CA3AF", marginBottom:20, lineHeight:1.6 }}>
                  Common interview questions for this topic — from top ML/AI companies. Study these to ace your technical rounds.
                </p>
                {selectedTopic.interviewQs.map((qa, i) => (
                  <div key={i} style={{ marginBottom:12 }}>
                    <InterviewCard qa={qa} i={i} />
                  </div>
                ))}
              </div>
            )}

            {/* Tab: Resources */}
            {topicTab === "resources" && (
              <div>
                <p style={{ fontSize:14, color:"#9CA3AF", marginBottom:20, lineHeight:1.6 }}>
                  Hand-picked resources — original papers, interactive blogs, videos, and official documentation for deep-diving into this topic.
                </p>
                {selectedTopic.resources.map((r, i) => (
                  <a key={i} href={r.url} target="_blank" rel="noreferrer" className="res-link">
                    <span style={{ fontSize:22, flexShrink:0 }}>{resourceTypeIcon[r.type] || "🔗"}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:500, fontSize:14, color:"#E8EAF0" }}>{r.title}</div>
                      <div style={{ fontSize:12, color:"#4B5563", marginTop:2 }}>{r.type}</div>
                    </div>
                    <span style={{ fontSize:16, color:"#4B5563" }}>↗</span>
                  </a>
                ))}
              </div>
            )}

            {/* Next / Prev navigation */}
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:40, gap:12 }}>
              <NavNeighbour direction="prev" selectedTopic={selectedTopic} curriculum={curriculum} openTopic={openTopic} />
              <NavNeighbour direction="next" selectedTopic={selectedTopic} curriculum={curriculum} openTopic={openTopic} />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ borderTop:"1px solid #1E2235", padding:"24px", textAlign:"center", marginTop:40 }}>
        <span style={{ fontSize:12, color:"#4B5563" }}>DeepLearn LMS · {totalTopics} Topics · {curriculum.reduce((a,p)=>a+p.topics.reduce((b,t)=>b+t.practicalProblems.length,0),0)} Problems · Built for deep learning mastery</span>
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────
function InterviewCard({ qa, i }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="q-card" style={{ cursor:"pointer" }} onClick={() => setOpen(o => !o)}>
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12 }}>
        <div style={{ display:"flex", gap:10, flex:1 }}>
          <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:13, color:"#818CF8", flexShrink:0, marginTop:1 }}>Q{i+1}</span>
          <span style={{ fontSize:14, fontWeight:500, color:"#E8EAF0", lineHeight:1.55 }}>{qa.q}</span>
        </div>
        <span style={{ color:"#4B5563", fontSize:16, flexShrink:0, transform:open?"rotate(180deg)":"none", transition:"transform .2s" }}>▾</span>
      </div>
      {open && (
        <div style={{ marginTop:12, paddingTop:12, borderTop:"1px solid #252840", display:"flex", gap:10 }}>
          <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:13, color:"#059669", flexShrink:0, marginTop:1 }}>A</span>
          <p style={{ fontSize:14, color:"#9CA3AF", lineHeight:1.65 }}>{qa.a}</p>
        </div>
      )}
    </div>
  );
}

function NavNeighbour({ direction, selectedTopic, curriculum, openTopic }) {
  const allTopics = curriculum.flatMap(p => p.topics.map(t => ({ ...t, _phase: p })));
  const idx = allTopics.findIndex(t => t.id === selectedTopic.id);
  const target = direction === "next" ? allTopics[idx + 1] : allTopics[idx - 1];
  if (!target) return <div />;
  return (
    <button onClick={() => openTopic(target._phase, target)}
      style={{ flex:1, maxWidth:280, padding:"12px 16px", background:"#14172B", border:"1px solid #1E2235", borderRadius:12, cursor:"pointer", textAlign:direction==="next"?"right":"left", transition:"border-color .15s" }}
      onMouseEnter={e => e.currentTarget.style.borderColor="#4F46E5"}
      onMouseLeave={e => e.currentTarget.style.borderColor="#1E2235"}>
      <div style={{ fontSize:11, color:"#4B5563", marginBottom:4 }}>{direction === "next" ? "Next →" : "← Previous"}</div>
      <div style={{ fontSize:14, fontWeight:600, color:"#E8EAF0" }}>{target.title}</div>
      <div style={{ fontSize:11, color:"#6B7280", marginTop:2 }}>{target._phase.phase}</div>
    </button>
  );
}
