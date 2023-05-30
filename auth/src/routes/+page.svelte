<script lang="ts">

import { goto } from '$app/navigation'

const login = () => {
        goto('/main');
    }

</script> 

<button on:click={login}>기록 속으로...</button>

<style>

button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
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
}

</style>