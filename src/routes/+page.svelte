<script>
    import Carousel from 'svelte-carousel';
    import { browser } from '$app/environment';
	import {test,cat} from "$lib/store";
	import {category,articles} from "$lib/data"

    var m =false;
    function menubar(){
        m= !m;
    }
    var src = ['blood.png','heart.png','hormones.png','immunity.PNG','kidneys.PNG','liver.PNG','metabolism.PNG','minerals.PNG','vitamins.PNG'];
    var name =['Blood','Heart','Hormones','Immunity','Kidneys','Liver','Metabolism','Minerals','Vitamins'];
    let logged = true;
    function login() {
        logged = !logged;
    }

	var cur_dt = new Date().toLocaleDateString();

	function cate(name){
		let n=name;
		test.set(n);
		window.location.href="/test";
	}
	function categ(name){
		let n=name;
		cat.set(n);
		window.location.href="/test/category";
	}
</script>

<div class="flex z-50 fixed top-0 w-full px-6 py-2.5 justify-between items-center bg-white">
	<img src="logo.png" class="m-auto h-8" alt="">
	<div class="circle absolute right-5 flex items-center justify-center border rounded-full w-10 h-10 bg-[#CCC9DC]">
		<i class="fa fa-user text-2xl text-white"></i>
	</div>
</div>

<div class="bg-white rounded-b-[2.5rem]">
	<div class="text-center bg-white mt-12 pt-5 rounded-b-[2.5rem]">
		<p class="text-gray-500 font-semibold text-xl">Welcome, User</p>
		<p class="font-bold text-2xl mt-2">Book your first blood test</p>
		<div class=" relative flex space-x-3 bg-gray-100 w-11/12 m-auto mt-8 p-3 px-5 rounded-xl focus:outline-purple-600 ">
			<i class="fa-solid fa-magnifying-glass mt-1"></i>
			<input type="text" placeholder="Choose a lab" class="bg-gray-100 w-full text-gray-800 font-semibold focus:outline-none">
			<i id='a1' class="fa-solid {m == false ? 'fa-angle-down' : 'fa-angle-up'}  mt-1" on:click={menubar}></i>
			{#if m}
				<div class="absolute z-20 text-left px-4 py-5 top-14 -left-3 bg-white w-full h-[10rem] rounded-lg shadow-lg shadow-gray-400">
					<p class="font-bold">Aware Lab • <span class="font-normal"> Rosenthaler ...</span></p>
				</div>
			{/if }
		</div>
		<button class="bg-gray-500 text-white py-1 px-5 rounded-lg my-5">Continue <i class="fa-solid fa-arrow-right ml-4"></i></button>
	</div>
</div>
	<div>
		{#if browser}
			<Carousel duration={500} particlesToShow={1} autoplay dots={false} arrows={false}>
				<div><img src="img1.jpg" class="p-5" alt=""></div>
				<div><img src="img2.jpg" class="p-5" alt=""></div>
				<div><img src="img3.jpg" class="p-5" alt=""></div>
				<div><img src="img4.jpg" class="p-5" alt=""></div>
				<div><img src="img5.jpg" class="p-5" alt=""></div>
			</Carousel>
		{/if}
	</div>

	<div class="px-5">
		<p class="font-bold text-lg">What do we test?</p>
		<div class="grid grid-cols-3 gap-4 mt-3">
			{#each {length: 9} as _, i}
				<a on:click={()=>cate(name[i])} class="bg-white w-full  py-3 text-center rounded-xl">
					<img src="{src[i]}" class="h-10 m-auto" alt="">
					<p class="font-semibold">{name[i]}</p>
				</a>
			{/each}
		</div>
	</div>

	<div class="mt-5">
		<p class="font-bold text-lg px-5">Available health markers</p>
		<div class="bg-white p-4 mt-3 mx-5 rounded-lg">
			<div class="bg-blue-100 rounded-lg p-4">
				<p class="font-semibold"> Get an overview of your current health status with our Complete Health check covering 46 health markers. You can read about each one by tapping on a marker.</p>
			</div>
			<div class="mt-2">
				{#each category as arr}
				<a on:click={()=>categ(arr.val.name)} class="flex justify-between items-start">
                    <div class="flex mt-4">
                        {#if arr.val.value == ''}
                        <p class="text-sm bg-gray-200 text-gray-700 flex w-[24px] h-[24px] items-center justify-center rounded-full">
                            <i class="fa fa-minus"></i>
                        </p>
                        {:else if arr.val.value >= arr.val.low && arr.val.value <= arr.val.high}
                            <p class="text-sm bg-green-200 text-green-700 flex w-[24px] h-[24px] items-center justify-center rounded-full">
                                <i class="fa fa-smile-o"></i>
                            </p>
                        {:else if (arr.val.value < (arr.val.low)) && (arr.val.value >= (arr.val.low - (arr.val.low*0.1)))}
                            <p class="text-sm bg-yellow-200 text-yellow-600 flex w-[24px] h-[24px] items-center justify-center rounded-full">
                                <i class="fa fa-arrow-down"></i>
                            </p>
                        {:else if (arr.val.value > (arr.val.high)) && (arr.val.value <= ((arr.val.high*0.1) + arr.val.high))}
                            <p class="text-sm bg-yellow-200 text-yellow-600 flex w-[24px] h-[24px] items-center justify-center rounded-full">
                                <i class="fa fa-arrow-up"></i>
                            </p>
                        {:else if (arr.val.value < (arr.val.low - (arr.val.low*0.1)))}
                            <p class="text-sm bg-red-200 text-red-600 flex w-[24px] h-[24px] items-center justify-center rounded-full">
                                <i class="fa fa-arrow-down"></i>
                            </p>
                        {:else if (arr.val.value > ((arr.val.high*0.1) + arr.val.high))}
                            <p class="text-sm bg-red-200 text-red-600 flex w-[24px] h-[24px] items-center justify-center rounded-full">
                                <i class="fa fa-arrow-up"></i>
                            </p>
                        {/if}
                        <h1 class="font-medium text-lg ml-1.5">{arr.val.name}</h1>
                    </div>
                    <div class="mt-3 text-right">
                        {#if arr.val.value == ''}
                            <p><i class="fa-solid fa-minus text-xs"></i><i class="fa-solid fa-minus text-xs"></i></p>
                        {:else}
                            <p class="text-lg font-semibold">{arr.val.value}</p>
                        {/if}
                        <p class="-mt-1 text-[#6C6C6E] text-base">{arr.val.symbol}</p>
                    </div>
                </a>
					
				{/each}
			</div>
		</div>
	</div>

	<div class="mt-6">
		<p class="font-bold text-xl ml-6 mb-5">Recommended articles</p>
		<div class="w-full py-3 px-5">
			{#if browser}
				<Carousel duration={500} particlesToShow={1} autoplay dots={false} arrows={false}>
					{#each articles as art}
						<div>
							<div class="box bg-white flex w-p-98 py-5 m-auto px-6 rounded-lg">
								<div class="block w-4/6">
									<div class="bg-[#F6F5FB] mb-4 -ml-2 items-center rounded-full w-fit h-fit px-4 py-1">
										<p class="text-[#7B65CF] font-bold ">{art.info[0].title}</p>
									</div>
									<p class="text-black mb-5 font-medium">{art.info[0].desc}</p>
									<p class="text-[#646464]">{cur_dt}</p>
								</div>
								<div class="flex w-2/6 justify-center items-center">
									<img src="/article.png" alt="img" class="w-[120px] h-[120px]">
								</div>
							</div>
						</div>
						
					{/each}
					
				</Carousel>
			{/if}
		</div>
	</div>


