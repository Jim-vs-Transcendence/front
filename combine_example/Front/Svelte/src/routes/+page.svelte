<!-- <script lang="ts">
</script>

<main>
	<div class="login">
		<a href="http://43.202.12.31:3000/auth/login">로그인을 해주세요</a>
	</div>
</main>

<style>
	:global(*) {
		margin: 0;
		padding: 0;
	}
	:global(main) {
		background-image: url('https://images.unsplash.com/photo-1683580607825-9d270ddbb3c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
		background-size: cover;
		background-position: center;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
	}
	.login {
		padding: 2rem;
	}

	a {
		color: #ffffff;
		text-decoration: none;
		font-size: 2rem;
	}

	a:hover {
		text-decoration: underline;
	}
</style> -->

<script lang="ts">

	import { goto } from '$app/navigation'

	const login = () => {
			goto('http://43.202.12.31:3000/auth/login');
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
