<template>
	<div class="window-nav">
		<p :class="item.active" v-for="item in windowList" @click="goPath(item.path)">
			{{item.name}}
			<span class="el-icon-close span-close"></span>
		</p>
	</div>
</template>

<script>
	export default{
		props: {
			windowList: {type: Array, default: () => []}
		},
		updated() {
			console.log(this.windowList)
		},
		data() {
			return {
				
			}
		},
		methods: {
			//前往页面
			goPath(path,children) {
				this.$router.push(path);
			}
		}
	}
</script>

<style>
	.window-nav{
		width: 100%;
		position: absolute;
		/* left: 1rem; */
		top: 1.3rem;
		font-size: 1.4rem;
		font-weight: bold;
		z-index: 0;
	}
	.window-item{
		height: 4.2rem;
		width: 15.7rem;
		background: #fff;
		display: inline-block;
		text-align: center;
		letter-spacing: 0.1rem;
		border-radius: 4.2rem 20rem 1rem 0;
		box-shadow:0rem 0.1rem 1rem 0rem rgba(4,0,0,0.1);
	}
	.window-no{
		background: #FBFBFB;
		color: #f00;
	}
	.span-close{
		margin-left: 1.5rem;
	}
</style>
