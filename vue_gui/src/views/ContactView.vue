<template lang="">
    <div class="contact">
        <div class="left">
            <h5>Please contact us, Leave us a message by filling in this form and we will get back to you ASAP</h5>
        </div>
        <div class="right">
            <form action="https://formspree.io/f/mqkjlqvp" method="post">
                        <h2>Leave a Message</h2>
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control btn-outline-info" name="fname"  placeholder="name@example.com" required>
                                <label for="floatingInput">Name</label>
                            
                        </div>
                        <div class="form-floating mb-3">
                            <input type="email" class="form-control" id="floatingInput2" name="email" placeholder="name@example.com" required>
                            <label for="floatingInput">Email address</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="floatingInput3" name="subject" placeholder="name@example.com" required>
                            <label for="floatingInput">Subject</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="floatingInput4" name="message" placeholder="name@example.com" required>
                            <label for="floatingInput">Message</label>
                        </div>
                        <button>Send</button>
                    </form>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.contact {
    width: 100vw;
    height: 100vh;
    display: flex;
  }
  
  .left {
    width: 50vw;
    height: 100vh;
    background-color: var(--tone-one);
    display: grid;
    place-items: center;
  }
  
  .right {
    width: 50vw;
    height: 100vh;
    background-color: var(--tone-three);
    display: grid;
    place-items: center;
  }
  
  .text {
    margin: 0 4rem 0 4rem;
    color: var(--tone-four);
  }
  form {
    margin: 0 4rem 0 4rem;
    width: 27rem;
    height: 32rem;
    padding: 0.6rem;
    background-color: var(--tone-one);
    border-radius: 1rem;
    color: var(--tone-four);
  }
  .form-floating {
    margin-top: 1.5rem;
  }
  
  .form-floating input,
  input:focus,
  input:active {
    background: none;
    border: none;
    border-radius: 0;
    border-bottom: 0.15rem solid var(--tone-four);
    outline: none;
    box-shadow: none;
  }
</style>