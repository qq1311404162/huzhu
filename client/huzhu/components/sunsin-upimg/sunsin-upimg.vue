<!-- 
 
/**
 * <sunsin-upimg type="" :count="1" :autoup="false"></sunsin-upimg>
 * 
 * type：上传类型
 * count:上传总数量(默认上传1张图片)
 * autoup:是否自动上传(无需传参数,参考以上)
 * 
 * 2018-12-26 MIT
 */ 
 
 -->


<template name='sunsin-upimg'>
	<view>
		<view class="picture_list">
			<view v-for="(item,index) in upload_picture_list" :key="index" class="picture_item">
				<!-- <image v-show="item.upload_percent < 100" :src="item.path" mode="aspectFill"></image> -->
				<image v-if="item.upload_percent == 100 && item.path_server != ''" :src="item.path_server" mode="aspectFill"></image>
				<view class="upload_progress" v-if="item.upload_percent < 100" :data-index="index" @click="previewImg">{{item.upload_percent}}%</view>
				<text class='del' @click='deleteImg' :data-index="index">×</text>
			</view>

			<view class='picture_item' v-if="upload_picture_list.length<count">
				<view class="add-image" @click='chooseImage'>
					<text>+</text>
				</view>
			</view>
		</view>
		<view class='y-up' v-if="autoup==false">
			<button @click='uploadimage(url)' class='yes-upload' v-if="upload_picture_list.length==count">上传图片</button>
		</view>
	</view>
</template>

<script>
	
	import config from '../../config';
	import { getStorage } from '@/utils/unis';
	
	export default {
		data() {
			return {
				imgs: [],
				upload_picture_list: []
			};
		},
		name: 'sunsin-upimg',
		props: {
			type: {
				type: String,
				default: 'avatar'
			},
			count: {
				type: Number,
				default: 1
			},
			autoup: {
				type: Boolean,
				default: true
			},
			source: {
				type: String,
				default: ''
			}
		},
		onLoad(){
			
			if (this.source.length !== 0) {
				
				this.upload_picture_list.push({
					path: this.source,
					path_server: this.source,
					upload_percent: 100
					
				});
			}
		},
		methods: {
			chooseImage() {
				cImage(this, parseInt(this.count));

			},
			uploadimage(e) {
				uImage(this);
			},
			deleteImg(e) {
				dImage(e, this);
			},
			previewImg(e) {
				pImage(e, this);
			}
		}

	}

	// 上传文件
	const upload_file_server = (that, upload_picture_list, j) => {
		
		const upload_task = uni.uploadFile({
			
			url: config.server_url + '/api/upload',
			filePath: upload_picture_list[j]['path'],
			name: 'file',
			header: {
				'Accept': 'application/json',
				// 'Authorization': getStorage()
			},
			formData: {
				'type': that.type
			},
			success(res) {
			
				let data = JSON.parse(res.data);
				console.log(data);
				let filename = data.data.file
				upload_picture_list[j]['path_server'] = config.server_url + filename
				that.upload_picture_list = upload_picture_list
				
				that.$emit('getPic', that.upload_picture_list);
			}
		})
		upload_task.onProgressUpdate((res) => {
			upload_picture_list[j]['upload_percent'] = res.progress
			that.upload_picture_list = upload_picture_list
		})
	}


	// 上传图片(this,api.imageup)
	const uImage = (_that) => {
		for (let j in _that.upload_picture_list) {
			if (_that.upload_picture_list[j]['upload_percent'] == 0) {
				upload_file_server(_that, _that.upload_picture_list, j)
			}
		}
	}


	// 删除图片
	const dImage = (e, _that) => {
		_that.upload_picture_list.splice(e.currentTarget.dataset.index, 1);
		_that.imgs.splice(e.currentTarget.dataset.index, 1);
		_that.upload_picture_list = _that.upload_picture_list;
	}


	// 选择图片
	const cImage = (_that, count) => {
		uni.chooseImage({
			count,
			sizeType: ['compressed'],
			sourceType: ['album', 'camera'],
			success(res) {
				for (let i in res.tempFiles) {
					res.tempFiles[i]['upload_percent'] = 0
					res.tempFiles[i]['path_server'] = ''
					_that.upload_picture_list.push(res.tempFiles[i])
				}
				if (_that.autoup) {
					count == _that.upload_picture_list.length ? uImage(_that) : console.log('图片不够!')
				}
				_that.imgs = _that.imgs.concat(res.tempFilePaths) ;
				_that.upload_picture_list = _that.upload_picture_list;
				_that.count = count;
			}
		})
	}

	// 预览图片
	const pImage = (e, _that) => {
		uni.previewImage({
			current: _that.imgs[e.currentTarget.dataset.index],
			urls: _that.imgs
		})
	}
</script>

<style>
	.picture_list image {
		width: 40upx;
		height: 40upx;
		margin: 0 4%;
	}

	.add-image,
	.up-pic image {
		margin-top: 2%;
		margin-left: 2%;
		width: 150upx;
		height: 150upx;
		color: #ddd;
		font-size: 144upx;
		line-height: 95%;
		text-align: center;
		background-color: #eee;
		cursor: pointer;
		border-radius: 10upx;
	}

	.picture_list {
		padding: 20upx;
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: flex-start;
		align-content: flex-start;
	}

	.picture_item {
		margin: 10px;
		margin-left: 0;
		position: relative;
		width: 160upx;
		height: 160upx;
	}

	.picture_item .del {
		position: absolute;
		top: -11upx;
		right: -11upx;
		color: #fff;
		border-radius: 50%;
		width: 40upx;
		height: 40upx;
		z-index: 2;
		line-height: 35upx;
		text-align: center;
		background-color: #f00;
	}

	.upload_progress {
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0.7;
		border-radius: 8upx;
		background-color: #000;
		color: #fff;
		width: 167upx;
		height: 160upx;
		text-align: center;
		line-height: 160upx;
		font-size: 12px;
	}

	.picture_item image {
		width: 160upx;
		height: 160upx;
	}

	.yes-upload {
		color: #fff;
		border-radius: 0;
		background-color: #00a0e9;
	}
</style>
