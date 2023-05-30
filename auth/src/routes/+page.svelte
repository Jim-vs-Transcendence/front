<script lang="ts">
  import { goto } from '$app/navigation'
  
  const login = () => {
    goto('/main');
  }
</script>

<button class="my-button" on:click={login}>기록 속으로...</button>

<style>
  .my-button {
    border: none;
    color: white;
    padding: 10px 20px; /* smaller padding */
    text-align: center;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    cursor: pointer;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150px; /* fixed width */
    height: 50px; /* fixed height */
  }
</style>