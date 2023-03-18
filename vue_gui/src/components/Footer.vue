<template lang="">
    <footer>
        
        <div class="initials">
            <div class="footerimg">
                
            </div>
            <div class="text pb-3 ps-2">
                Copyright @{{currentYear}} All rights reserved| Made by <strong>Thandolwethu Beko</strong>
            </div>
        </div>
        <div class="footer-links">
            <a href="https://www.facebook.com/thandolwethu.beko.9" target="_blank"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="https://twitter.com/" target="_blank"><i class="fa-brands fa-twitter"></i></a>
            <a href="https://za.linkedin.com/" target="_blank"><i class="fa-brands fa-linkedin-in"></i></a>
            <a href="https://www.instagram.com/" target="_blank"><i class="fa-brands fa-instagram"></i></a>
        </div>

    </footer>
</template>
<script>
export default {
    name: 'footer',
    data() {
        return {
            currentYear: new Date().getFullYear()
        }
    }
}
</script>
<style scoped>
footer {
    position: fixed;
    bottom: -10px;
    width: 100vw;
    display: flex;
    justify-content: space-between;
}

.footerimg {
    background-image: url(https://i.postimg.cc/kGJtkkGX/My-project-1-2.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 200px;
    height: 80px;
    bottom: -15px;
    position: fixed;
    margin-bottom: 1rem;
    scale: 1.5;
    left: -3rem;
    filter: invert(43%) sepia(59%) saturate(394%) hue-rotate(340deg) brightness(87%) contrast(89%);
}

.text {
    color: var(--tone-five);
    background: none;
}

.initials {
    display: flex;
    flex-direction: column;
    color: var(--tone-five);
}

.footer-links {
    display: flex;
    gap: 0.7rem;
    margin-right: 2rem;
    color: var(--tone-five);
}

.footer-links i {
    scale: 1.1;
    color: var(--tone-five);
}

.footer-links i:hover {
    scale: 1.3;
    animation: none;
    animation: iconAqua 1s ease-in-out forwards;
}

.fa-facebook-f {
    animation: iconsPop 2s ease-in-out infinite;
}
.fa-twitter {
    animation: iconsPop 2s 0.3s ease-in-out infinite;
}
.fa-linkedin-in {
    animation: iconsPop 2s 0.6s ease-in-out infinite;
}
.fa-instagram {
    animation: iconsPop 2s 0.9s ease-in-out infinite;
}

@keyframes iconsPop {
    0%{
        scale: 0.8;
    }
    50%{
        scale: 1.5;
    }
    100%{
        scale: 0.8;
    }
}
</style>