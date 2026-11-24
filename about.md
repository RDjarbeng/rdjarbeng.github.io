---
layout: about
title: About Richard Djarbeng
permalink: /about/
custom_css_class: about-page cv
description: Richard Djarbeng is a software and machine learning engineer and researcher. Since October 2026 he has been a Research Associate at the Kigali Collaborative Research Center in Rwanda. He holds an MSc in Electrical and Computer Engineering from Carnegie Mellon University.
---

<header class="cv-head">
  <img class="cv-head__photo" src="/assets/images/richard/richard-djarbeng-headshot.jpg" alt="Richard Djarbeng" width="148" height="148">
  <div class="cv-head__id">
    <h1 class="cv-head__name">Richard Djarbeng</h1>
    <p class="cv-head__role">Software and Machine Learning Engineer, Researcher</p>
    <p class="cv-head__affil">Research Associate at the Kigali Collaborative Research Center (since October 2026). MSc ECE, Carnegie Mellon University.</p>
    <p class="cv-head__links">
      <a href="mailto:rdjarbeng@rdjarbeng.com">rdjarbeng@rdjarbeng.com</a>
      <a href="/assets/documents/Richard_Resume_Research.pdf">CV (PDF)</a>
      <a href="https://github.com/RDjarbeng" rel="me">GitHub</a>
      <a href="https://www.linkedin.com/in/richarddjarbeng" rel="me">LinkedIn</a>
      <a href="https://www.twitter.com/DjarbengRichard" rel="me">X / Twitter</a>
    </p>
  </div>
</header>

<nav class="cv-nav" aria-label="On this page">
  <a href="#research">Research</a>
  <a href="#experience">Experience</a>
  <a href="#education">Education</a>
  <a href="#projects">Projects</a>
  <a href="#open-source">Open source</a>
  <a href="#writing">Writing</a>
  <a href="#skills">Skills</a>
  <a href="#contact-form">Contact</a>
</nav>

<section class="cv-section cv-section--bio" aria-label="Biography">
  <div class="cv-section__body">
    <p>I'm a software and machine learning engineer, and I do research on computer vision and environmental sensing. I have an MSc in Electrical and Computer Engineering from Carnegie Mellon University, and I'm an AWS Certified Solutions Architect.</p>
    <p>I joined the Kigali Collaborative Research Center (KCRC) as a Research Associate in October 2026. My work there is on edge AI and compression methods for computer vision.</p>
    <p>Before KCRC, I was a Research Associate at Carnegie Mellon University Africa in Kigali, working with Prof. Edwin Mugume. We built low-cost weather sensors for deployment across East Africa, and most of my work was on their design. Before that I worked in Prof. Albert Presto's group at Carnegie Mellon University in Pittsburgh, on a way to measure black carbon from smartphone photos of filter samples.</p>
    <p>My focus right now is computer vision and machine learning. I'm preparing PhD applications in machine learning for computer vision and environmental sensing. I chose this area partly because I like to see tangible evidence of work done.</p>
  </div>
</section>

<section class="cv-section" id="research">
  <h2 class="cv-section__label">Research interests</h2>
  <div class="cv-section__body">
    <p>Deep learning and computer vision for sensing the physical world. I'm also interested in multimodal learning, vision models and robotics. Questions I keep returning to:</p>
    <ul class="cv-list">
      <li>Ground stations measure air quality accurately at a single point, while satellites give area averages. How do we bridge the two, especially in Africa, where ground stations are sparse?</li>
      <li>Low-cost sensor networks are noisy. Can they be calibrated in real time against reference-grade instruments?</li>
      <li>Where can recent computer vision models improve environmental and satellite sensing?</li>
      <li>How small can a vision model get, through compression, and still be useful on low-power IoT hardware?</li>
    </ul>
    <p>Outside my main work I'm drawn to aerospace engineering. Part of it is a long-standing love of physics, and part of it is that I see aerospace as the frontier of human innovation, the place where engineering gets pushed furthest. {% assign aero = site.posts | where: "slug", "i-wanna-fly-an-introduction-to-the-aerospace-industry" | first %}I've written about it in {% if aero %}<a href="{{ aero.url }}">an introduction to the aerospace industry</a> and in {% endif %}<a href="/how-carnegie-mellon-sent-missions-to-the-moon-without-an-aerospace-department/">how Carnegie Mellon sent missions to the Moon without an aerospace department</a>.</p>
  </div>
</section>

<section class="cv-section" id="experience">
  <h2 class="cv-section__label">Experience</h2>
  <div class="cv-section__body">

    <div class="cv-entry">
      <p class="cv-entry__when">Oct 2026 to present</p>
      <div class="cv-entry__what">
        <h3 class="cv-entry__title">Research Associate</h3>
        <p class="cv-entry__org">Kigali Collaborative Research Center, Kigali, Rwanda</p>
        <p>Edge AI and compression methods for computer vision. KCRC is the African deployment partner for the CRISPER IoT project (Compression-Driven Insights and Performance Enrichment for IoT).</p>
      </div>
    </div>

    <div class="cv-entry">
      <p class="cv-entry__when">Jul 2024 to Oct 2025</p>
      <div class="cv-entry__what">
        <h3 class="cv-entry__title">Research Associate</h3>
        <p class="cv-entry__org">Carnegie Mellon University Africa, Kigali, Rwanda</p>
        <p>Worked with Prof. Edwin Mugume on low-cost weather sensors deployed across East Africa, mostly on their design.</p>
        <details class="cv-more">
          <summary>Technical details</summary>
          <ul>
            <li>Designed 3D radiation shields for the sensor nodes in Fusion 360</li>
            <li>Estimated and simulated each node's energy use and network traffic</li>
            <li>Built the time-series pipelines that ingest data from the field</li>
            <li>Built dashboards for the live air quality and weather data</li>
          </ul>
        </details>
      </div>
    </div>

    <div class="cv-entry">
      <p class="cv-entry__when">Jan to May 2024</p>
      <div class="cv-entry__what">
        <h3 class="cv-entry__title">Research Assistant</h3>
        <p class="cv-entry__org">Center for Atmospheric Particle Studies (CAPS), Carnegie Mellon University, Pittsburgh, USA</p>
        <p>In Prof. Albert Presto's group, through the CMU-Africa student exchange. I worked on a smartphone-based method for measuring black carbon. We photographed Aethalometer filter samples and analysed the images across wavelength channels to tell fossil-fuel pollution apart from wood smoke.</p>
      </div>
    </div>

    <div class="cv-entry">
      <p class="cv-entry__when">Aug to Dec 2023</p>
      <div class="cv-entry__what">
        <h3 class="cv-entry__title">Teaching Assistant, Internet of Things</h3>
        <p class="cv-entry__org">Carnegie Mellon University Africa, Kigali, Rwanda</p>
        <p>Ran recitations and helped students build IoT systems with sensors on Raspberry Pi, Node.js backends and HTTP calls over 2G/3G modems.</p>
      </div>
    </div>

    <div class="cv-entry">
      <p class="cv-entry__when">May to Aug 2023</p>
      <div class="cv-entry__what">
        <h3 class="cv-entry__title">Graduate Intern</h3>
        <p class="cv-entry__org">AfriqAir, Kigali Collaborative Research Center, Kigali, Rwanda</p>
        <p>Built a wireless data logger that collected air quality readings from a Thermo Fisher TEOM monitor automatically, in Python and C++ on a Raspberry Pi and an Arduino. Also built a React and TypeScript dashboard for the live sensor feeds.</p>
      </div>
    </div>

  </div>
</section>

<section class="cv-section" id="education">
  <h2 class="cv-section__label">Education</h2>
  <div class="cv-section__body">

    <div class="cv-entry">
      <p class="cv-entry__when">Jul 2022 to May 2024</p>
      <div class="cv-entry__what">
        <h3 class="cv-entry__title">MSc Electrical and Computer Engineering</h3>
        <p class="cv-entry__org">Carnegie Mellon University, Kigali, Rwanda and Pittsburgh, USA</p>
        <p>Focused on machine learning and software engineering. I was president of the Internet of Things club.</p>
        <details class="cv-more">
          <summary>Selected coursework</summary>
          <ul>
            <li><strong>Computer Vision</strong> (16-720): filtering and edge detection, HOG, Lucas-Kanade tracking, homographies, camera models, two-view geometry, structure from motion, CNNs and photometric stereo</li>
            <li><strong>Introduction to Deep Learning</strong> (11-785): RNNs and LSTMs, sequence-to-sequence models, attention, Transformers and Vision Transformers</li>
            <li><strong>Cognitive Robotics</strong> (18-799): ROS in C++, CRAM plans in Lisp, and pick-and-place with the PR2 and Lynxmotion AL5D arms in Gazebo and Bullet</li>
            <li><strong>Autonomous Driving</strong> (18-744): the full vehicle stack from sensing and perception to planning, control and fault management; SAE autonomy levels; how EV drivetrains differ from combustion ones</li>
            <li><strong>Internet of Things</strong>: wireless embedded sensing and its protocols, including HTTP, MQTT, LoRaWAN, GSM/GPRS, 3G/4G and GPS</li>
          </ul>
          <p>Breadth areas: algorithms and programming languages; AI, robotics and control; circuits; computer hardware; signal processing and communications; software systems and networking.</p>
        </details>
      </div>
    </div>

    <div class="cv-entry">
      <p class="cv-entry__when">2017 to 2021</p>
      <div class="cv-entry__what">
        <h3 class="cv-entry__title">BSc Computer Engineering</h3>
        <p class="cv-entry__org">University of Ghana, Accra, Ghana</p>
        <p>Electives in computer graphics (Unity3D), software engineering (PHP, JavaScript, Java and JavaFX on Postgres, OracleDB and SQLite) and computer-aided design in Solid Edge.</p>
      </div>
    </div>

    <div class="cv-entry">
      <p class="cv-entry__when">Jun 2026</p>
      <div class="cv-entry__what">
        <h3 class="cv-entry__title">AWS Certified Solutions Architect, Associate</h3>
        <p class="cv-entry__org">Amazon Web Services. <a href="https://www.credly.com/badges/7572e2fe-f26c-4711-9e7d-d439b1fe20b2/public_url" rel="noreferrer">Verify on Credly</a> or read <a href="/personal/finally-aws-certified-solutions-architect-richard-djarbeng/">how I prepared</a>.</p>
        <details class="cv-more">
          <summary>What this covers</summary>
          <p>Designing how applications run on AWS so they are fast, stay up when servers fail, keep data safe and don't cost more than they need to. That means picking and configuring compute (EC2, Lambda), networking (VPC, subnets, security groups), storage (S3, EBS, EFS) and databases (RDS, DynamoDB) along the lines of the AWS Well-Architected Framework.</p>
        </details>
      </div>
    </div>

  </div>
</section>

<section class="cv-section" id="projects">
  <h2 class="cv-section__label">Projects</h2>
  <div class="cv-section__body">
    <ol class="cv-projects">
      <li class="has-thumb">
        <img class="cv-thumb" src="{{ '/assets/images/project_air_quality_dashboard.jpg' | thumb: 180 }}" alt="Air quality dashboard for Kigali" width="88" height="88" loading="lazy">
        <div>
        <h3 class="cv-entry__title"><a href="https://airanalysis.netlify.app" rel="noreferrer">Kigali air quality analysis dashboard</a> <span class="cv-tag">Data analysis</span></h3>
        <p>PM2.5 in Kigali, analysed from US Embassy reference monitor data. The mean was 43.31 µg/m³, and 57% of readings were in the "Unhealthy" range or worse.</p>
      </div>
      </li>
      <li class="has-thumb">
        <img class="cv-thumb" src="{{ '/assets/images/comp_vision_roboflow.jpeg' | thumb: 180 }}" alt="Particulate filter images used for PM prediction" width="88" height="88" loading="lazy">
        <div>
        <h3 class="cv-entry__title"><a href="https://www.africa.engineering.cmu.edu/news/2024/08/20-richard-djarbeng.html" rel="noreferrer">Mapping filter imagery to PM values</a> <span class="cv-tag">Machine learning</span></h3>
        <p>Models that predict PM values from photos of particulate filters taken at several wavelengths. It is a cheap stand-in for lab analysis of black carbon.</p>
      </div>
      </li>
      <li class="has-thumb">
        <img class="cv-thumb" src="{{ '/assets/images/satellite_orbiting_earth_color_codes.jpg' | thumb: 180 }}" alt="Illustration of satellite imaging" width="88" height="88" loading="lazy">
        <div>
        <h3 class="cv-entry__title">Transmission corridor monitoring <span class="cv-tag">Remote sensing</span></h3>
        <p>Used Google Earth Engine and CNNs to spot encroachment on power transmission corridors in Ghana, for GRIDCo.</p>
      </div>
      </li>
      <li class="has-thumb">
        <img class="cv-thumb" src="{{ '/assets/images/richard_picture_comparison_background_remover.png' | thumb: 180 }}" alt="Before and after background removal" width="88" height="88" loading="lazy">
        <div>
        <h3 class="cv-entry__title"><a href="/free-hd-background-remover-effortless-image-editing-tool/">Free background remover</a> <span class="cv-tag">Deep learning</span></h3>
        <p>A segmentation model (rembg with U2Net) running on Hugging Face Spaces.</p>
      </div>
      </li>
      <li class="has-thumb">
        <img class="cv-thumb" src="{{ '/assets/images/gsm_module.jpg' | thumb: 180 }}" alt="GSM module" width="88" height="88" loading="lazy">
        <div>
        <h3 class="cv-entry__title"><a href="https://github.com/RDjarbeng/HTTP-GET-POST-Request-with-GSM" rel="noreferrer">HTTP over GSM</a> <span class="cv-tag">Embedded C++</span></h3>
        <p>HTTP GET and POST requests from GSM modules in C++, for sending IoT data from places without Wi-Fi.</p>
      </div>
      </li>
      <li class="has-thumb">
        <img class="cv-thumb" src="{{ '/assets/images/countdown_mobile.png' | thumb: 180 }}" alt="Countdown app on a phone" width="88" height="88" loading="lazy">
        <div>
        <h3 class="cv-entry__title"><a href="https://github.com/RDjarbeng/countdown" rel="noreferrer">Countdown PWA</a> <span class="cv-tag">Web</span></h3>
        <p>A countdown timer web app with themes that works offline.</p>
      </div>
      </li>
    </ol>
    <p class="cv-note">Some pictures are illustrations rather than screenshots.</p>
    <details class="cv-more">
      <summary>Six more projects</summary>
      <ol class="cv-projects" start="7">
        <li class="has-thumb"><img class="cv-thumb" src="{{ '/assets/images/kigali_bustop_motor.jpg' | thumb: 180 }}" alt="Taxis and motorbikes at a Kigali bus stop" width="88" height="88" loading="lazy"><div><h3 class="cv-entry__title">Real-time taxi fleet pipeline <span class="cv-tag">Data engineering</span></h3><p>Streamed taxi data through Google Cloud Dataflow into BigQuery, with live metrics in Looker Studio.</p></div></li>
        <li class="has-thumb"><img class="cv-thumb" src="{{ '/assets/images/loan_risk_prediction_dashboard.jpg' | thumb: 180 }}" alt="Loan risk prediction dashboard" width="88" height="88" loading="lazy"><div><h3 class="cv-entry__title">Loan default risk prediction <span class="cv-tag">AutoML</span></h3><p>A Vertex AI AutoML model, evaluated with precision, recall and ROC curves, plus a look at which features mattered most.</p></div></li>
        <li class="has-thumb"><img class="cv-thumb" src="{{ '/assets/images/trustmrr_revenue_leaderboard_cover.jpg' | thumb: 180 }}" alt="Illustration of a revenue leaderboard" width="88" height="88" loading="lazy"><div><h3 class="cv-entry__title">E-commerce purchase prediction <span class="cv-tag">BigQuery ML</span></h3><p>Predicted repeat purchases from Google Analytics data. Features built from checkout progress, traffic source and device raised ROC AUC from 0.72 to 0.94.</p></div></li>
        <li class="has-thumb"><img class="cv-thumb" src="{{ '/assets/images/university_management_system_dashboard.jpg' | thumb: 180 }}" alt="University admission system dashboard" width="88" height="88" loading="lazy"><div><h3 class="cv-entry__title"><a href="https://github.com/RDjarbeng/University-Admission-Management-System" rel="noreferrer">University admission system</a> <span class="cv-tag">Java</span></h3><p>An admission management system in JavaFX and T-SQL.</p></div></li>
        <li class="has-thumb"><img class="cv-thumb" src="{{ '/assets/images/escape_covid_maze_game.jpg' | thumb: 180 }}" alt="Escape the Covid Maze game screen" width="88" height="88" loading="lazy"><div><h3 class="cv-entry__title">Escape the Covid Maze <span class="cv-tag">Unity / C#</span></h3><p>A 2D Unity game where enemies chase you through a maze using A* search.</p></div></li>
        <li class="has-thumb"><img class="cv-thumb" src="{{ '/assets/images/git_complete_ml_package_cover_rd.webp' | thumb: 180 }}" alt="Machine Learning Complete course cover" width="88" height="88" loading="lazy"><div><h3 class="cv-entry__title"><a href="https://github.com/Nyandwi/machine_learning_complete/" rel="noreferrer">Machine Learning Complete</a> <span class="cv-tag">Open source</span></h3><p>I contributed to this open machine learning course (see below).</p></div></li>
      </ol>
    </details>
  </div>
</section>

<section class="cv-section" id="open-source">
  <h2 class="cv-section__label">Open source</h2>
  <div class="cv-section__body">
    <div class="cv-entry">
      <p class="cv-entry__when">Sep 2023</p>
      <div class="cv-entry__what">
        <h3 class="cv-entry__title"><a href="https://github.com/Nyandwi/machine_learning_complete" rel="noreferrer">Machine Learning Complete</a></h3>
        <p class="cv-entry__org">by Nyandwi, about 5k stars</p>
        <p>My <a href="https://github.com/Nyandwi/machine_learning_complete/pull/9" rel="noreferrer">pull request #9</a> was merged. It added a list of free Python learning resources (books, courses and videos) to the introductory chapter. I checked that each one really was free before adding it.</p>
      </div>
    </div>
    <div class="cv-entry">
      <p class="cv-entry__when">Ongoing</p>
      <div class="cv-entry__what">
        <h3 class="cv-entry__title"><a href="https://github.com/sveltia/sveltia-cms" rel="noreferrer">Sveltia CMS</a></h3>
        <p class="cv-entry__org">Git-based headless CMS</p>
        <p> One of the early contributors to SveltiaCMS. I've reported <a href="https://github.com/sveltia/sveltia-cms/issues?q=is%3Aissue%20state%3Aclosed%20author%3ARDjarbeng" rel="noreferrer">several issues</a> and followed them through to fixes. This site's editing content workflow runs on SveltiaCMS it.</p>
      </div>
    </div>
  </div>
</section>

<section class="cv-section" id="writing">
  <h2 class="cv-section__label">Selected writing</h2>
  <div class="cv-section__body">
    <p>I write about what I'm building and learning. Some places to start:</p>
    <ul class="cv-list cv-list--plain">
      <li><a href="/air-quality/">Air quality and environmental sensing in Africa</a>, a reading list that goes from the basics to field work</li>
      {%- assign w = site.posts | where: "slug", "understanding-the-air-quality-index-aqi" | first -%}{%- if w %}
      <li><a href="{{ w.url }}">{{ w.title }}</a></li>{% endif -%}
      {%- assign w = site.posts | where: "slug", "ambient-air-quality-standards-in-west-africa-the-current-state-2025" | first -%}{%- if w %}
      <li><a href="{{ w.url }}">{{ w.title }}</a></li>{% endif -%}
      {%- assign w = site.posts | where: "slug", "complete-machine-learning-package-learn-by-doing" | first -%}{%- if w %}
      <li><a href="{{ w.url }}">{{ w.title }}</a></li>{% endif -%}
      {%- assign w = site.posts | where: "slug", "machine-learning-experts-to-follow" | first -%}{%- if w %}
      <li><a href="{{ w.url }}">{{ w.title }}</a></li>{% endif -%}
      {%- assign w = site.posts | where: "slug", "why-can-i-pay-for-netflix-instantly-but-not-send-money-abroad" | first -%}{%- if w %}
      <li><a href="{{ w.url }}">{{ w.title }}</a>, from a series on why sending money abroad is slow and expensive</li>{% endif %}
    </ul>
    <p><a href="/posts/">All technical posts</a>. <a href="/editorial-policy/">How I source and correct posts</a>.</p>
  </div>
</section>

<section class="cv-section" id="skills">
  <h2 class="cv-section__label">Skills</h2>
  <div class="cv-section__body">
    <dl class="cv-skills">
      <dt>Languages</dt><dd>Python, JavaScript/TypeScript, C++, C, Java, C#, SQL. Some Dart, PHP and Ruby.</dd>
      <dt>Machine learning</dt><dd>PyTorch, Keras, FastAI. CNNs and transfer learning, object detection (YOLO-World), segmentation (U-Net, ISNet), evaluating and red-teaming LLMs.</dd>
      <dt>Data and cloud</dt><dd>AWS, Google Cloud (BigQuery, BigQuery ML, Dataflow, Vertex AI), Google Earth Engine, Looker Studio, Hugging Face Spaces.</dd>
      <dt>Embedded and IoT</dt><dd>Raspberry Pi, Arduino, GSM modules, sensor calibration, enclosure design in Fusion 360.</dd>
      <dt>Robotics</dt><dd>ROS (C++), CRAM, manipulation and pick-and-place, Gazebo and Bullet, homogeneous transforms, A* path planning.</dd>
      <dt>Web</dt><dd>React, Node.js and Express, REST and WebSockets, PWAs, Eleventy, Sveltia and Decap CMS.</dd>
    </dl>
    <p class="cv-cvs">CVs for different roles: <a href="/assets/documents/Richard_Resume_Research.pdf">research</a>, <a href="/assets/documents/Resume_ML.pdf">machine learning</a>, <a href="/assets/documents/Richard_Resume_Software_engineering.pdf">software engineering</a> and <a href="/assets/documents/robotics_cv_richard_main.pdf">robotics</a>.</p>
  </div>
</section>

<section class="cv-section cv-section--contact">
  <h2 class="cv-section__label">Contact</h2>
  <div class="cv-section__body">
    <p>If you want to work together on research, or have a question about something I wrote, email <a href="mailto:rdjarbeng@rdjarbeng.com">rdjarbeng@rdjarbeng.com</a> or use the form below. And if a post helped you, you can <a href="https://buymeacoffee.com/rdjarbeng" rel="noreferrer">buy me a coffee</a>.</p>
  </div>
</section>

