import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { Box, Button, Divider, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from "react-hook-form";
import AuthContext from '../../../contexts/Auth/AuthContext'

import Page from '../../../components/Layout/Page';

import styles from './Login.style.js'

const useStyles = makeStyles(styles);

export default function Login({ history }) {
    const classes = useStyles();

    const emailFormCheck = useRef(null);
    const passwordFormCheck = useRef(null);

    const [emailEntered, setEmailEntered] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [passwordEntered, setPasswordEntered] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);


    const { login, kakaoLogin, isAuthenticated } = React.useContext(AuthContext)
    const { handleSubmit, register } = useForm({
        reValidateMode: 'onBlur'
    });

    const onSubmit = (data) => alert(JSON.stringify(data))

    React.useEffect(() => {
        if (isAuthenticated) {
            alert('로그인 상태입니다.')
            history.push('/')
        }
    }, []);



    const validateEmail = (emailEntered) => {
        const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

        if (emailEntered.match(emailRegex)) {
            setEmailEntered(emailEntered);
            setIsEmailValid(true);
        } else {
            setEmailEntered(emailEntered);
            setIsEmailValid(false);
        }
    }
    const validatePassword = (passwordEntered) => {
        // 특수문자 / 문자 / 숫자포함 8 ~ 15자리
        const passwordRegex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

        if (passwordEntered.match(passwordRegex)) {
            setPasswordEntered(passwordEntered);
            setIsPasswordValid(true);
        } else {
            setPasswordEntered(passwordEntered);
            setIsPasswordValid(false);
        }
    }
    // 이메일 형식 검사, 비밀번호 형식 검사
    const formCheck = () => {
        if (!isEmailValid) {
            emailFormCheck.current.style.color = 'red';
        }
        else {
            emailFormCheck.current.style.color = 'white';
        }

        if (!isPasswordValid) {
            passwordFormCheck.current.style.color = 'red';
        }
        else {
            passwordFormCheck.current.style.color = 'white';
        }
    }

    return (
        <Page>
            <Box className={classes.login}>
                <Box className={classes.loginSection}>
                    <Box className={classes.loginSectionInner}>
                        <Link href='/account/login'>
                            <a className={classes.loginFacebook}>
                                <Button>FaceBook으로 간편하게 로그인</Button>
                            </a>
                        </Link>
                        <Divider className={classes.loginDivider} />
                        {/* //handleSubmit(login) */}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                name='email'
                                className={classes.loginInput}
                                inputRef={register}
                                onChange={(e) => { validateEmail(e.target.value) }}
                                label='Email : abc@gmail.com'
                                autoComplete='email'
                                variant='outlined' type='email' />
                            <Typography className={classes.loginInputErrmsg} ref={emailFormCheck}> 이메일을 형식에 맞게 입력해주세요 </Typography>
                            <TextField className={classes.loginPassword}
                                name='password'
                                inputRef={register}
                                onChange={(e) => { validatePassword(e.target.value) }}
                                label='Password : 숫자 문자 특수 문자 8 ~ 15 자리 이상'
                                variant='outlined'
                                type='password' />
                            <Typography className={classes.loginInputErrmsg} ref={passwordFormCheck}> 비밀번호를 입력해주세요 </Typography>
                            <a className={classes.loginFinder}>비밀번호를 잃어버리셨나요?</a>
                            <Button
                                className={classes.loginSummitButton}
                                onClick={formCheck}
                                type='submit'>로그인
                            </Button>
                        </form>
                        <Divider className={classes.loginDivider}></Divider>
                        <Box className={classes.loginSignup}>
                            <Typography>아직 Tooravel의 회원이 아니신가요? 지금 바로 가입하세요~</Typography>
                            <Link href='/account/signup'>
                                <a>
                                    <Button>가입하기</Button>
                                </a>
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Page>
    )
}