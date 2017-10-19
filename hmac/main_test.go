package main

import "testing"
import "strings"

func TestSign(t *testing.T) {
	//TODO: write unit test cases for sign()
	//use strings.NewReader() to get an io.Reader
	//interface over a simple string
	//https://golang.org/pkg/strings/#NewReader
	signingKey := "thisisthekey"
	sig, _ := sign(signingKey, strings.NewReader("testing"))
	sig2, _ := sign(signingKey, strings.NewReader("testing"))
	if sig != sig2 {
		t.Errorf("Same string did not produce the same sig")
	}
	sig2, _ = sign(signingKey, strings.NewReader("nottesting"))
	if sig == sig2 {
		t.Errorf("Change in test string led to same signature")
	}
}

func TestVerify(t *testing.T) {
	//TODO: write until test cases for verify()
	//use strings.NewReader() to get an io.Reader
	//interface over a simple string
	//https://golang.org/pkg/strings/#NewReader
	signingKey := "thisisthekey"
	sig, _ := sign(signingKey, strings.NewReader("testing"))
	valid, _ := verify(signingKey, sig, strings.NewReader("testing"))
	if !valid {
		t.Error("Signature was invalid")
	}
}
