<template>
    <div>
        <cube-form
            :model="model"
            :schema="schema"
            :immediate-validate="false"
            :options="options"
            @validate="validateHandler"
            @submit.prevent="submitHandler"
            v-if="!isLogin"
            >
        </cube-form>
        <cube-button v-else>用户名：{{userMap.name}}</cube-button>
    </div>
</template>

<script>
import { mapState } from "vuex";
import us from '@/service/user'
import { log } from 'util';
    export default {
        data() {
            return {
                validity: {},
                valid: undefined,
                userMap:{},
                model: {
                    userName:'',
                    passWord:''
                },
                schema: {
                    groups: [
                        {
                            legend: '用户登陆',
                            fields: [
                                {
                                    type: 'input',
                                    modelKey: 'userName',
                                    label: '用户名：',
                                    props: {
                                        placeholder: '请输入用户名'
                                    },
                                    rules: {
                                        required: true
                                    },
                                    trigger: 'blur'
                                },
                                {
                                    type: 'input',
                                    modelKey: 'passWord',
                                    label: 'Input',
                                    props: {
                                        placeholder: '请输入密码',
                                        type: "password",
                                        eye: { open: true}
                                    },
                                    rules: {
                                        required: true
                                    },
                                    trigger: 'blur'
                                }
                            ]
                        },
                        {
                            fields: [
                                {
                                    type: 'submit',
                                    label: '登陆'
                                }
                            ]
                        }
                    ]
                },
                options: {
                    scrollToInvalidField: true,
                    layout: 'standard' // classic fresh
                }
            }
        },
        computed: {
            ...mapState({
                isLogin: state => state.user.isLogin
            }),
        },
        created () {
            if(this.isLogin) {
                us.userInfo().then(({code,data}) => {
                    if(code){
                        this.userMap = data 
                    }
                })
            }
        },
        methods: {
            submitHandler(e) {
                this.$store.dispatch("login", this.model)
                .then(success => {
                    if(success){
                        const path = this.$route.query.redirect || '/'
                        this.$router.push(path)
                    }
                }).catch(error => {
                    const toast = this.$createToast({
                        time:2000,
                        txt:'登陆失败',
                        type:'error'
                    }).show();
                })
            },
            validateHandler(result) {
                this.validity = result.validity
                this.valid = result.valid
                console.log('validity', result.validity, result.valid, result.dirty, result.firstInvalidFieldIndex)
            },
        }
    }
</script>

<style lang="stylus" scoped>

</style>