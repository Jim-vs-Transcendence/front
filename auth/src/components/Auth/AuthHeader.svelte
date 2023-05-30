<script>
    import { auth, authToken } from "../../service/store";
    import { goto } from '$app/navigation'
    import { onMount } from 'svelte';

    const onLogout = () => {
        authToken.logout();
        goto('/login');
    }

    onMount(() => {
        auth.isLogin();
    });
</script>

<header>
    <div>
        <h1>헤더 Title</h1>
        <nav>
            {#if $auth.email}
                <button on:click={onLogout}>로그아웃</button>
            {:else}
                <a href="/login">로그인</a>
                <a href="/register">회원가입</a>
            {/if}
        </nav>
    </div>
</header>