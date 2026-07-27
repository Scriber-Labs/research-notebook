# Project 1 Architecture

```mermaid
%%====================================================================
%%  CURVED-CORNER MERMAID WITH SUBGRAPH HEADER
%%====================================================================
%%{ init: {
        "theme": "base",
        "themeVariables": {
            "background": "#0d1117",
            "lineColor": "#14b5ff",
            "textColor": "whitesmoke",
            "fontFamily": "'Aclonica', sans-serif",
            "borderRadius": "16"       /* larger radius for more rounded corners */
        },
        "themeCSS": ".nodeLabel, .edgeLabel, .cluster-label, .cluster-label text, .label, .label text, text, .katex, .katex *, .MathJax, .MathJax *, mjx-container, mjx-container * { color: whitesmoke !important; fill: whitesmoke !important; -webkit-text-fill-color: whitesmoke !important; }",
        "handDrawn": true
    } }%%
%%====================================================================

flowchart TB

    %%--------------------------------------------------------------
    %%  COLOR RAMP (pseudo-gradient)
    %%--------------------------------------------------------------
    classDef stage0 fill:#0b1c2d,stroke:#14b5ff,stroke-width:2px,color:#ffffff,rx:12,ry:12;
    classDef stage1 fill:#0f2a3d,stroke:#14b5ff,stroke-width:2px,color:#ffffff,rx:12,ry:12;
    classDef stage2 fill:#103b4f,stroke:#00f5db,stroke-width:2px,color:#ffffff,rx:12,ry:12;
    classDef stage3 fill:#124f55,stroke:#00f5db,stroke-width:2px,color:#ffffff,rx:12,ry:12;
    classDef stage4 fill:#1a6b63,stroke:#00f5db,stroke-width:2px,color:#ffffff,rx:12,ry:12;
    classDef stage5 fill:#1f4e5f,stroke:#f78166,stroke-width:2px,color:#ffffff,rx:12,ry:12;
    classDef stage6 fill:#3a2f2a,stroke:#f78166,stroke-width:2px,color:#ffffff,rx:12,ry:12;
    classDef stage7 fill:#0f2a3d,stroke:#14b5ff,stroke-width:2px,color:#ffffff,rx:12,ry:12;

    classDef dashed fill:#161b22,stroke:#14b5ff,stroke-dasharray:6 6,color:#ffffff,rx:12,ry:12;

    %%--------------------------------------------------------------
    %%  MAIN PIPELINE SUBGRAPH WITH HEADER
    %%--------------------------------------------------------------
    subgraph PIML["PIML Framework"]
        direction TB
        B["1️⃣ Collocation Points"]:::stage1
        C["2️⃣ Neural Ansatz"]:::stage2
        D["3️⃣ Automatic Differentiation"]:::stage3
        E["4️⃣ Variational Physics Loss"]:::stage4
        F["5️⃣ Total Loss"]:::stage5
        G["6️⃣ Optimizer (Adam)"]:::stage6

        B --> C
        C --> D
        D --> E
        E --> F
        F --> G
        G -- training loop --> C
    end

    %%--------------------------------------------------------------
    %%  CONTEXT & DIAGNOSTICS
    %%--------------------------------------------------------------
    A["0️⃣ Define SHO Dynamics"]:::stage0
    H["7️⃣ Diagnostics & Sanity Checks"]:::stage7

    A --> PIML:::dashed
    PIML --> H
    
    click C "assets/phase_space.png" "View figure"
```

## Mathematical Mapping

|**Step**|**Component**| **Mathematical <br> Description**                                                  |**Interpretation**| **Importance in Pipeline**                                                                                   |
|:-------|:------------|:-----------------------------------------------------------------------------------|:-----------------|:-------------------------------------------------------------------------------------------------------------|
| 0️⃣ | **Problem setup** | SHO Lagrangian and equations of motion                                             | Defines the physical system. | Provides the exact DE the network must respect.                                                              |
| 1️⃣ | **Collocation points** | $t\in [0, 2\pi]$                                                                   | Synthetic "data" for physics enforcement. | Keeps the pipeline purely physics-driven.                                                                    |
| 3️⃣ | **Automatic differentiation** | $p_\theta = \dot{q}_\theta \quad \text {and} \quad \ddot{q}_\theta$                | Recovers velocity and acceleration | Provides the quantities needed for the physics residual.                                                     |
| 4️⃣ | **Physics loss** | $\mathcal{L}_\text{phys} = \langle (\ddot{q}_\theta + \omega^2 q_\theta)^2\rangle$ | Encodes Euler-Lagrange structure | *Low fidelity* is maintained since the network only needs to reduce the residual (not satisfy it exactly).   |
| 5️⃣ | **Total loss** | $\mathcal{L}_\text{total} = \mathcal{L}_\text{phys}$                               | Low-fidelity PINN objective function | Highlights how pure physics can drive learning.                                                              |
| 6️⃣ | **Optimization** | $\theta_{k+1} = \theta_k - \eta \nabla_\theta \mathcal{L}_\text{total}$            | Gradient-based learning | Standard gradient descent; the dynamics of convergence reveal interpretability cure.                         |
| 7️⃣ | **Diagnostics** | $H_\theta(t) = H(q_\theta, p_\theta)$                                              | Sanity checks and structure validation | Makes failure modes explicit for analysis.                                                                   |