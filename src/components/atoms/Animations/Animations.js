export const animationsKeyframes = `
    @keyframes slickOut {
        0% {
            opacity: 1;
            transform: translate(0, 0);
        }
        100% {
            opacity: 0;
            transform: translate(-40px, 0);
        }
    }

    @keyframes slickIn {
        0% {
            opacity: 0;
            transform: translate(40px, 0);
        }
        100% {
            opacity: 1;
            transform: translate(0, 0);
        }
    }

    @keyframes simpleOut {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

    @keyframes simpleIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    @keyframes slideIn {
        from {
            bottom: -1000px;
        }
        to {
            bottom: 0;
        }
    }

    @keyframes slideOut {
        from {
            bottom: 0;
        }
        to {
            bottom: -1000px;
        }
    }

    @keyframes animFadeMove {
        0% {
            opacity: 0;
            -webkit-transform: translate3d(0, 10px, 0);
            transform: translate3d(0, 10px, 0);
        }
        100% {
            opacity: 1;
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }
    }

    @keyframes animFadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    @keyframes animFadeOut {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

    @keyframes animFadeZoomIn {
        0% {
            opacity: 0;
            transform: translate3d(0, 0, 0) scale3d(0, 0, 0);
        }
        100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
        }
    }
    
    @keyframes animFadeZoomOut {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
            
    @keyframes animLoad {
        0% {
            opacity: 1;
            transform: scale3d(0, 0.3, 1);
        }
        33% {
            opacity: 1;
            transform: scale3d(0.5, 0.3, 1);
        }
        50% {
            opacity: 1;
            transform: scale3d(0.6, 0.3, 1);
        }
        80%, 85% {
            opacity: 1;
            transform: scale3d(1, 0.3, 1);
            animation-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
        }
        100% {
            opacity: 1;
            transform: scale3d(1, 1, 1);
        }
    }


    @keyframes animSlideInTop {
        0% {
            transform: translate3d(0, -100%, 0);
        }
        100% {
            transform: translate3d(0, 0, 0);
        }
    }

    @keyframes animSlideOutTop {
        0% {
            transform: translate(0, 0);
        }
        100% {
            transform: translate(0, -100%);
        }
    }


    @keyframes animScaleUp {
        0% {
            opacity: 0;
            transform: translate3d(0, -50%, 0) scale3d(0, 0, 1);
        }
        100% {
            opacity: 1;
            transform: translate3d(0, -50%, 0) scale3d(1, 1, 1);
        }
    }

    @keyframes animMoveUpDown {
        0% {
            transform: translate(0, 60px);
        }
   
        5%, 30%, 34%, 38%, 60%, 64%, 68%, 100%{
            transform: translate(0, 0);
        }
   
        32%, 36%, 62%, 66% {
            transform: translate(0px, -5px);
         }
   }

   
    @keyframes spin1 {
        100% { transform: rotate(360deg);}
    }

    @keyframes animScaleInOut {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.25);
        }
        100% {
            transform: scale(1);
        }
    }
`;

const animationsClasses = `
    ${animationsKeyframes}

    .anim-slickOut {
        animation: slickOut .2s ease-in-out;
        animation-fill-mode: forwards;
    }

    .anim-slickIn {
        animation: slickIn .2s ease-in-out;
        animation-fill-mode: forwards;
    }

    .anim-simpleOut {
        animation: simpleOut .3s ease-in-out;
        animation-fill-mode: forwards;
    }

    .anim-simpleIn {
        animation: simpleIn .5s ease-in-out;
        animation-fill-mode: forwards;
    }

    .anim-slideIn {
        animation-duration: 2s;
        animation-name: slideIn;
    }
    .anim-slideOut {
        animation-duration: 2s;
        animation-name: slideOut;
    }

    .anim-fadeIn {
        animation-name: animFadeIn;
        animation-duration: 0.3s;
    }

    .anim-fadeOut {
        animation-name: animFadeOut;
        animation-duration: 0.3s;
    }

    .anim-fadeZoomIn {
        animation-name: animFadeZoomIn;
        animation-duration: 0.3s;
    }

    .anim-fadeZoomOut {
        animation-name: animFadeZoomOut;
        animation-duration: 0.3s;
    }

    .anim-fadeMove {
        animation-name: animFadeMove;
        animation-timing-function: ease-out;
    }

    .anim-load {
        animation-name: animLoad;
        animation-duration: 2.5s;
    }

    .anim-slideInTop {
        animation-name: animSlideInTop;
        animation-duration: 0.3s;
        animation-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
    }
    .anim-slideOutTop {
        animation-name: animSlideOutTop;
        animation-duration: 0.3s;
        animation-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
    }

    .anim-scaleUp {
        animation-name: animScaleUp;
        animation-duration: 0.3s;
        animation-delay: 0.2s;
        animation-fill-mode: both;
    }

    .anim-moveUpDown {
        animation: animMoveUpDown 15s ease 1;
    }

    .anim-scaleInOut {
        animation: animScaleInOut 1.5s ease-in-out infinite;
    }
`;

export default animationsClasses;
