import React, { useState, ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "components/Button";
import useApi from "hooks/useApi";
import { Input, Form } from "antd";

function SignIn(): ReactElement {
  const API = useApi();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const validate = async () => {
    try {
      const validation = await form.validateFields();
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleSubmit = async () => {
    const isValid = await validate();
    if (!isValid) {
      return;
    }

    try {
      const values = await form.getFieldsValue();
      const signed = await API.signIn(values.email, values.password);
      if ("error" in signed) {
        throw new Error("Something went wrong");
      }

      history.replace("/");
    } catch (error) {
      toast(error.toString());
      setIsLoading(false);
    }
  };

  return (
    <Form form={form}>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input type="email" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input type="password" />
      </Form.Item>
      <Button onClick={handleSubmit} disabled={isLoading}>
        Sign In
      </Button>
    </Form>
  );
}

export default SignIn;
