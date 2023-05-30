<script lang="ts">
    import { onMount } from "svelte";
	import { page } from "$app/stores"

	let user: any = null;
	export let	userId: any = $page.params.userid;

	onMount(async () => {
		const res = await fetch('http://43.202.12.31:3000/user/' + userId);
		user = await res.json();
		console.log();
	})
</script>

<main>
	<div class="header">
		{#if user}
			<h1 class="welcome">Welcome {user.nickname}</h1>
		{/if}
	</div>
	{#if user}
		<div class="content">
			<div class="profile-wrapper">
				<img class="profile" src={user.avatar} alt="intra" />
			</div>
		</div>
	{/if}
</main>

<style>
	:global(*) {
		margin: 0;
		padding: 0;
	}

	main {
		/* background-image: url('https://images.unsplash.com/photo-1683580607825-9d270ddbb3c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'); */
		background-size: cover;
		background-position: center;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
	}

	.header {
		text-align: center;
		margin-bottom: 2rem;
	}

	.welcome {
		color: #000000;
		font-size: 2rem;
		/* text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); */
		margin-top: 2rem;
	}

	.content {
		text-align: center;
		position: absolute;
		top: 0;
		right: 0;
		margin: 1rem;
	}

	.profile-wrapper {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		overflow: hidden;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
		display: inline-block;
	}

	.profile {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 50%;
	}

</style>
