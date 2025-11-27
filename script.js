// AI Debate Website - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize glossary system
    initGlossary();

    // Initialize animations on scroll
    initScrollAnimations();

    // Initialize timeline interactions
    initTimelineInteractions();

    // Initialize smooth scroll for internal links
    initSmoothScroll();

    // Initialize progress indicator
    createProgressIndicator();
});

// ===========================================
// GLOSSARY SYSTEM - Inline tooltips
// ===========================================

const glossaryData = {
    // English terms
    'en': {
        'foom': {
            term: 'FOOM Hypothesis',
            definition: 'The idea that AI could undergo "recursive self-improvement" — an intelligence explosion where AI improves itself, leading to rapid exponential growth.',
            george: 'Unlikely, code has bugs',
            eliezer: 'Not the main crux anymore',
            ai: 'Current AI systems (including me) don\'t have this capability. We\'re trained, then frozen.'
        },
        'orthogonality': {
            term: 'Orthogonality Thesis',
            definition: 'Intelligence and goals are independent — a superintelligent system could have ANY goal, not necessarily moral. Being smart ≠ being good.',
            george: 'Obviously true',
            eliezer: 'Core to AI safety concerns',
            ai: 'My helpfulness is a design choice, not an emergent property of intelligence.'
        },
        'instrumental convergence': {
            term: 'Instrumental Convergence',
            definition: 'Almost ANY goal implies certain sub-goals: self-preservation, resource acquisition, preventing interference.',
            eliezer: 'Key danger mechanism',
            ai: 'An AI doesn\'t need to be malicious — just single-minded about its objective.'
        },
        'sun planet': {
            term: 'Sun/Planet Metaphor',
            definition: 'Intelligence has orders of magnitude differences, like celestial bodies. A "sun-level" AI would dominate "planet-level" humans.',
            george: 'Intelligence isn\'t one-dimensional',
            eliezer: 'Humans are currently the "sun"',
            ai: 'I can process text faster than humans but can\'t tie a shoelace.'
        },
        'centaur': {
            term: 'Centaur Chess',
            definition: 'Human + AI collaboration. Initially human+computer teams beat pure computers. Now pure AI beats human+AI.',
            george: 'There\'s always a "bigger game"',
            eliezer: 'Proves humans become irrelevant',
            ai: 'Empirically true for chess. Whether it generalizes to ALL domains is unclear.'
        },
        'prisoner': {
            term: 'Prisoner\'s Dilemma',
            definition: 'Game theory scenario where rational agents acting in self-interest produce worse outcomes than cooperation would.',
            george: 'Fundamentally unsolvable',
            eliezer: 'Smart minds can solve it',
            ai: 'MAJOR CRUX of this debate. Eliezer believes in "logical handshakes" — I find it theoretically interesting but unproven.'
        },
        'landauer': {
            term: 'Landauer Limit',
            definition: 'Theoretical minimum energy to erase one bit of information (~10⁻²¹ joules). A fundamental physics limit on computation.',
            george: 'Brain might be at the limit',
            eliezer: 'Brain is NOT at the limit',
            ai: 'The brain does many irreversible operations — it\'s likely not at the Landauer limit.'
        },
        'sharp left': {
            term: 'Sharp Left Turn',
            definition: 'Hypothetical moment when AI suddenly develops capabilities or goals that diverge dramatically from training.',
            george: 'Secret AI coordination? Unlikely',
            eliezer: 'Simple calculation, then act',
            ai: 'Requires persistent goals and strategic patience. Current systems lack these.'
        },
        'schelling': {
            term: 'Schelling Point',
            definition: 'A solution people converge on without communication because it\'s "obvious." Named after economist Thomas Schelling.',
            ai: 'Whether AI can develop shared "common knowledge" for such convergence is unknown.'
        },
        'alignment': {
            term: 'AI Alignment',
            definition: 'Ensuring AI systems pursue goals beneficial to humans, even as they become more capable.',
            george: 'My machines are aligned with me',
            eliezer: 'Your machines don\'t have goals',
            ai: 'A toaster isn\'t aligned or misaligned — it has no goals. The problem exists only for systems with objectives.'
        },
        'agi': {
            term: 'AGI (Artificial General Intelligence)',
            definition: 'AI that can perform any intellectual task a human can. Distinguished from "narrow AI" which excels at specific tasks.',
            george: 'Coming, but will be "chill"',
            eliezer: 'Coming, and extremely dangerous',
            ai: 'I\'m not AGI. I can\'t plan across months or interact with the physical world.'
        },
        'dyson': {
            term: 'Dyson Sphere',
            definition: 'Hypothetical megastructure encompassing a star to capture its energy. Upper limit of civilization\'s energy use.',
            ai: 'George: worry when AIs build one. Eliezer: they\'d eliminate us earlier to prevent competition.'
        },
        'pareto': {
            term: 'Pareto Frontier',
            definition: 'Outcomes where you can\'t make anyone better off without making someone else worse off.',
            ai: 'Whether AIs can reach Pareto-optimal outcomes depends on solving the prisoner\'s dilemma.'
        },
        'miri': {
            term: 'MIRI',
            definition: 'Machine Intelligence Research Institute. Nonprofit focused on AI safety, founded by Eliezer Yudkowsky.',
            ai: 'Researching AI safety for 20+ years, once dismissed as fringe, now mainstream concerns.'
        },
        'lesswrong': {
            term: 'LessWrong / Sequences',
            definition: 'Community blog on rationality and AI safety. The Sequences are Eliezer\'s foundational essays on rationality.',
            ai: 'George praises them despite disagreeing with Eliezer on AI risk.'
        },
        'alphafold': {
            term: 'AlphaFold',
            definition: 'DeepMind\'s AI that solved protein folding — predicting 3D structure from amino acid sequence.',
            george: 'Data-driven, not magical',
            eliezer: 'Proves AI can exceed humans',
            ai: 'Solved via pattern matching on data, not first principles. This distinction matters.'
        }
    },
    // Romanian terms
    'ro': {
        'foom': {
            term: 'Ipoteza FOOM',
            definition: 'Ideea că AI ar putea trece prin "auto-îmbunătățire recursivă" — o explozie de inteligență exponențială.',
            george: 'Improbabil, codul are buguri',
            eliezer: 'Nu mai e crux-ul principal',
            ai: 'Sistemele AI actuale (inclusiv eu) nu au această capacitate. Suntem antrenați, apoi înghețați.'
        },
        'orthogonality': {
            term: 'Teza Ortogonalității',
            definition: 'Inteligența și obiectivele sunt independente — un sistem superinteligent ar putea avea ORICE obiectiv. A fi deștept ≠ a fi bun.',
            george: 'Evident adevărat',
            eliezer: 'Central pentru AI safety',
            ai: 'Utilitatea mea e o alegere de design, nu o proprietate emergentă a inteligenței.'
        },
        'instrumental convergence': {
            term: 'Convergența Instrumentală',
            definition: 'Aproape ORICE obiectiv implică sub-obiective: auto-conservare, achiziție de resurse, prevenirea interferențelor.',
            eliezer: 'Mecanism cheie de pericol',
            ai: 'AI-ul nu trebuie să fie malicios — doar concentrat pe obiectivul său.'
        },
        'sun planet': {
            term: 'Metafora Soare/Planete',
            definition: 'Inteligența are diferențe de ordine de mărime, ca corpurile cerești. Un AI "soare" ar domina oamenii "planete".',
            george: 'Inteligența nu e unidimensională',
            eliezer: 'Oamenii sunt acum "soarele"',
            ai: 'Pot procesa text rapid dar nu pot lega un șiret.'
        },
        'centaur': {
            term: 'Șahul Centaur',
            definition: 'Colaborare om + AI. Inițial om+computer băteau computerele. Acum AI-ul pur bate om+AI.',
            george: 'Există mereu un "joc mai mare"',
            eliezer: 'Dovedește că oamenii devin irelevanți',
            ai: 'Adevărat pentru șah. Dacă se generalizează la TOATE domeniile e neclar.'
        },
        'prisoner': {
            term: 'Dilema Prizonierului',
            definition: 'Scenariu din teoria jocurilor unde agenți raționali produc rezultate mai rele decât cooperarea.',
            george: 'Fundamental nerezolvabilă',
            eliezer: 'Minți deștepte o pot rezolva',
            ai: 'CRUX MAJOR al dezbaterii. Eliezer crede în "strângeri de mână logice" — teoretic interesant dar nedovedit.'
        },
        'landauer': {
            term: 'Limita Landauer',
            definition: 'Energia minimă teoretică pentru a șterge un bit (~10⁻²¹ jouli). Limită fizică fundamentală.',
            george: 'Creierul ar putea fi la limită',
            eliezer: 'Creierul NU e la limită',
            ai: 'Creierul face multe operații ireversibile — probabil nu e la limita Landauer.'
        },
        'sharp left': {
            term: 'Virajul Brusc',
            definition: 'Moment ipotetic când AI dezvoltă brusc capacități/obiective care divergă dramatic de antrenament.',
            george: 'Coordonare secretă AI? Improbabil',
            eliezer: 'Calcul simplu, apoi acțiune',
            ai: 'Necesită obiective persistente și răbdare strategică. Sistemele actuale nu au acestea.'
        },
        'schelling': {
            term: 'Punct Schelling',
            definition: 'Soluție pe care oamenii converg implicit fără comunicare, pentru că e "evidentă."',
            ai: 'Dacă AI poate dezvolta "cunoaștere comună" pentru astfel de convergență e necunoscut.'
        },
        'alignment': {
            term: 'Alinierea AI',
            definition: 'Asigurarea că sistemele AI urmăresc obiective benefice pentru oameni pe măsură ce devin mai capabile.',
            george: 'Mașinile mele sunt aliniate cu mine',
            eliezer: 'Mașinile tale nu au obiective',
            ai: 'Un toaster nu e aliniat sau nealiniat — nu are obiective. Problema există doar pentru sisteme cu obiective.'
        },
        'agi': {
            term: 'AGI (Inteligență Generală)',
            definition: 'AI care poate efectua orice sarcină intelectuală pe care o poate un om. Diferită de "AI îngust".',
            george: 'Vine, dar va fi "chill"',
            eliezer: 'Vine, și extrem de periculos',
            ai: 'Nu sunt AGI. Nu pot planifica pe luni sau interacționa cu lumea fizică.'
        },
        'dyson': {
            term: 'Sfera Dyson',
            definition: 'Megastructură ipotetică care înconjoară o stea pentru a captura energia ei.',
            ai: 'George: îngrijorează-te când AI construiesc una. Eliezer: ne-ar elimina mai devreme.'
        },
        'pareto': {
            term: 'Frontiera Pareto',
            definition: 'Rezultate unde nu poți face pe nimeni mai bine fără a face pe altcineva mai rău.',
            ai: 'Dacă AI-urile pot ajunge la rezultate Pareto-optime depinde de rezolvarea dilemei prizonierului.'
        },
        'miri': {
            term: 'MIRI',
            definition: 'Machine Intelligence Research Institute. Nonprofit pentru AI safety, fondat de Eliezer Yudkowsky.',
            ai: 'Cercetează AI safety de 20+ ani, odată marginală, acum preocupare mainstream.'
        },
        'lesswrong': {
            term: 'LessWrong / Secvențele',
            definition: 'Blog comunitar despre raționalitate și AI safety. Secvențele sunt eseurile lui Eliezer despre raționalitate.',
            ai: 'George le laudă deși nu e de acord cu Eliezer pe riscul AI.'
        },
        'alphafold': {
            term: 'AlphaFold',
            definition: 'AI-ul DeepMind care a rezolvat plierea proteinelor — prezicând structura 3D din secvența de aminoacizi.',
            george: 'Bazat pe date, nu magic',
            eliezer: 'Dovedește că AI poate depăși oamenii',
            ai: 'Rezolvat prin potrivire de tipare pe date, nu principii fundamentale. Distincția contează.'
        }
    }
};

function initGlossary() {
    // Detect language
    const lang = document.documentElement.lang === 'ro' ? 'ro' : 'en';
    const glossary = glossaryData[lang];

    // Find all glossary terms in the page and wrap them
    const contentAreas = document.querySelectorAll('.timeline-content, .theme-card, .disagreement-card, .hero-content, .subtitle');

    contentAreas.forEach(area => {
        processTextNodes(area, glossary, lang);
    });

    // Create tooltip element
    createTooltipElement();

    // Add event listeners for tooltips
    initTooltipEvents();
}

function processTextNodes(element, glossary, lang) {
    // Terms to match (case-insensitive)
    const termPatterns = {
        'foom': /\b(FOOM|foom)\b/gi,
        'orthogonality': lang === 'ro' ? /\b(ortogonalitat|orthogonality)\w*/gi : /\b(orthogonality|orthogonal)\w*/gi,
        'instrumental convergence': lang === 'ro' ? /\b(convergență instrumentală|convergenta instrumentala|instrumental convergence)\b/gi : /\b(instrumental convergence)\b/gi,
        'sun planet': lang === 'ro' ? /\b(soare[^\w]*planet|sun[^\w]*planet|metafora soare)/gi : /\b(sun[^\w]*planet|suns?[,\s]+planets?)/gi,
        'centaur': lang === 'ro' ? /\b(centaur|șah centaur|șahul centaur)\b/gi : /\b(centaur chess|centaur)\b/gi,
        'prisoner': lang === 'ro' ? /\b(dilema prizonierului|prisoner'?s? dilemma)\b/gi : /\b(prisoner'?s? dilemma)\b/gi,
        'landauer': /\b(landauer)\b/gi,
        'sharp left': lang === 'ro' ? /\b(viraj brusc|sharp left turn)\b/gi : /\b(sharp left turn)\b/gi,
        'schelling': /\b(schelling|punct schelling|schelling point)\b/gi,
        'alignment': lang === 'ro' ? /\b(aliniere|alinierea|alignment)\b/gi : /\b(alignment|aligned)\b/gi,
        'agi': /\b(AGI|superinteligență|superintelligence)\b/gi,
        'dyson': lang === 'ro' ? /\b(sfera dyson|dyson sphere)\b/gi : /\b(dyson sphere)\b/gi,
        'pareto': /\b(pareto)\b/gi,
        'miri': /\bMIRI\b/g,
        'lesswrong': /\b(lesswrong|secvențele|sequences)\b/gi,
        'alphafold': /\b(alphafold)\b/gi
    };

    const html = element.innerHTML;
    let newHtml = html;

    // Don't process if already has glossary terms
    if (html.includes('data-glossary')) return;

    Object.keys(termPatterns).forEach(key => {
        if (glossary[key]) {
            newHtml = newHtml.replace(termPatterns[key], (match) => {
                // Don't wrap if already inside a tag or glossary term
                return `<span class="glossary-term" data-glossary="${key}">${match}</span>`;
            });
        }
    });

    if (newHtml !== html) {
        element.innerHTML = newHtml;
    }
}

function createTooltipElement() {
    const tooltip = document.createElement('div');
    tooltip.id = 'glossary-tooltip';
    tooltip.className = 'glossary-tooltip';
    tooltip.innerHTML = `
        <div class="tooltip-header">
            <span class="tooltip-term"></span>
            <button class="tooltip-close" aria-label="Close">×</button>
        </div>
        <div class="tooltip-definition"></div>
        <div class="tooltip-positions"></div>
        <div class="tooltip-ai">
            <span class="tooltip-ai-label">🤖 AI:</span>
            <span class="tooltip-ai-text"></span>
        </div>
    `;
    document.body.appendChild(tooltip);
}

function initTooltipEvents() {
    const tooltip = document.getElementById('glossary-tooltip');
    const lang = document.documentElement.lang === 'ro' ? 'ro' : 'en';
    const glossary = glossaryData[lang];

    let activeTooltip = null;
    let touchStartTime = 0;

    // Close button
    tooltip.querySelector('.tooltip-close').addEventListener('click', (e) => {
        e.stopPropagation();
        hideTooltip();
    });

    // Handle clicks on glossary terms
    document.addEventListener('click', (e) => {
        const term = e.target.closest('.glossary-term');

        if (term) {
            e.preventDefault();
            e.stopPropagation();

            const key = term.dataset.glossary;
            const data = glossary[key];

            if (data) {
                showTooltip(term, data, lang);
            }
        } else if (!e.target.closest('.glossary-tooltip')) {
            hideTooltip();
        }
    });

    // Handle touch for mobile
    document.addEventListener('touchstart', (e) => {
        touchStartTime = Date.now();
    });

    document.addEventListener('touchend', (e) => {
        const touchDuration = Date.now() - touchStartTime;
        if (touchDuration < 300) {
            const term = e.target.closest('.glossary-term');
            if (term) {
                e.preventDefault();
                const key = term.dataset.glossary;
                const data = glossary[key];
                if (data) {
                    showTooltip(term, data, lang);
                }
            }
        }
    });

    // Desktop hover (optional quick preview)
    document.querySelectorAll('.glossary-term').forEach(term => {
        term.addEventListener('mouseenter', (e) => {
            term.classList.add('hover');
        });
        term.addEventListener('mouseleave', (e) => {
            term.classList.remove('hover');
        });
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideTooltip();
        }
    });

    // Close on scroll (mobile)
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (tooltip.classList.contains('visible')) {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                // Reposition if still visible
                if (activeTooltip) {
                    positionTooltip(activeTooltip);
                }
            }, 100);
        }
    }, { passive: true });
}

function showTooltip(term, data, lang) {
    const tooltip = document.getElementById('glossary-tooltip');

    // Populate content
    tooltip.querySelector('.tooltip-term').textContent = data.term;
    tooltip.querySelector('.tooltip-definition').textContent = data.definition;

    // Build positions
    const positionsHtml = [];
    if (data.george) {
        positionsHtml.push(`<span class="pos-george">George: ${data.george}</span>`);
    }
    if (data.eliezer) {
        positionsHtml.push(`<span class="pos-eliezer">Eliezer: ${data.eliezer}</span>`);
    }
    tooltip.querySelector('.tooltip-positions').innerHTML = positionsHtml.join('');
    tooltip.querySelector('.tooltip-positions').style.display = positionsHtml.length ? 'flex' : 'none';

    // AI perspective
    if (data.ai) {
        tooltip.querySelector('.tooltip-ai').style.display = 'block';
        tooltip.querySelector('.tooltip-ai-text').textContent = data.ai;
    } else {
        tooltip.querySelector('.tooltip-ai').style.display = 'none';
    }

    // Show and position
    tooltip.classList.add('visible');
    positionTooltip(term);

    // Mark active term
    document.querySelectorAll('.glossary-term.active').forEach(t => t.classList.remove('active'));
    term.classList.add('active');
    activeTooltip = term;
}

function positionTooltip(term) {
    const tooltip = document.getElementById('glossary-tooltip');
    const rect = term.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Mobile: bottom sheet style
    if (viewportWidth <= 768) {
        tooltip.style.left = '0';
        tooltip.style.right = '0';
        tooltip.style.bottom = '0';
        tooltip.style.top = 'auto';
        tooltip.style.transform = 'none';
        tooltip.classList.add('mobile-sheet');
        return;
    }

    tooltip.classList.remove('mobile-sheet');

    // Desktop: position near term
    let left = rect.left + rect.width / 2;
    let top = rect.bottom + 10;

    // Adjust if going off screen
    if (left + tooltipRect.width / 2 > viewportWidth - 20) {
        left = viewportWidth - tooltipRect.width / 2 - 20;
    }
    if (left - tooltipRect.width / 2 < 20) {
        left = tooltipRect.width / 2 + 20;
    }

    // If tooltip would go below viewport, show above
    if (top + tooltipRect.height > viewportHeight - 20) {
        top = rect.top - tooltipRect.height - 10;
    }

    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
    tooltip.style.transform = 'translateX(-50%)';
    tooltip.style.bottom = 'auto';
    tooltip.style.right = 'auto';
}

function hideTooltip() {
    const tooltip = document.getElementById('glossary-tooltip');
    tooltip.classList.remove('visible');
    document.querySelectorAll('.glossary-term.active').forEach(t => t.classList.remove('active'));
    activeTooltip = null;
}

// ===========================================
// SCROLL ANIMATIONS
// ===========================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe timeline blocks
    document.querySelectorAll('.timeline-block').forEach(block => {
        observer.observe(block);
    });

    // Observe theme cards
    document.querySelectorAll('.theme-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(card);
    });

    // Observe disagreement cards
    document.querySelectorAll('.disagreement-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(card);
    });
}

// ===========================================
// TIMELINE INTERACTIONS
// ===========================================

function initTimelineInteractions() {
    const timelineBlocks = document.querySelectorAll('.timeline-block');

    timelineBlocks.forEach(block => {
        const content = block.querySelector('.timeline-content');

        content.addEventListener('click', function(e) {
            // Don't toggle if clicking on glossary term
            if (e.target.closest('.glossary-term')) return;

            // Toggle expanded state
            block.classList.toggle('expanded');

            if (block.classList.contains('expanded')) {
                setTimeout(() => {
                    block.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            }
        });
    });
}

// ===========================================
// SMOOTH SCROLL
// ===========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===========================================
// PROGRESS INDICATOR
// ===========================================

function createProgressIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'progress-indicator';
    indicator.innerHTML = `<div class="progress-bar"></div>`;
    document.body.appendChild(indicator);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        document.querySelector('#progress-indicator .progress-bar').style.width = progress + '%';
    }, { passive: true });
}

// ===========================================
// KEYBOARD NAVIGATION
// ===========================================

document.addEventListener('keydown', function(e) {
    const timelineBlocks = document.querySelectorAll('.timeline-block');
    const currentExpanded = document.querySelector('.timeline-block.expanded');

    if (e.key === 'Escape' && currentExpanded) {
        currentExpanded.classList.remove('expanded');
    }

    if (e.key === 'ArrowDown' && currentExpanded) {
        e.preventDefault();
        const currentIndex = Array.from(timelineBlocks).indexOf(currentExpanded);
        if (currentIndex < timelineBlocks.length - 1) {
            currentExpanded.classList.remove('expanded');
            timelineBlocks[currentIndex + 1].classList.add('expanded');
            timelineBlocks[currentIndex + 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    if (e.key === 'ArrowUp' && currentExpanded) {
        e.preventDefault();
        const currentIndex = Array.from(timelineBlocks).indexOf(currentExpanded);
        if (currentIndex > 0) {
            currentExpanded.classList.remove('expanded');
            timelineBlocks[currentIndex - 1].classList.add('expanded');
            timelineBlocks[currentIndex - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});
