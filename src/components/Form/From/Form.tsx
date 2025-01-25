"use client";
import {
  Box,
  Button,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Step1 from "../Step1/Step1";
import Step2 from "../Step2/Step2";
import { Formik, Form as FormFormik, FormikErrors } from "formik";
import * as Yup from "yup";
import { ProjectForm } from "@/types";
import { useFetching } from "@/hooks/useFetching";
import { Loading } from "@/components/Loading";

const steps = ["Основная информация", "Финансовые параметры"];

export const Form = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [sendForm, loading, error] = useFetching(async (data: ProjectForm) => {
    await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(3);
  const initialValues: ProjectForm = {
    title: "",
    description: "",
    goal: 0,
    currency: "",
    startDate: "",
    socialLinks: "",
    logo: "",
  };

  const validationSchemas = [
    Yup.object({
      title: Yup.string().required("Название проекта обязательно"),
      description: Yup.string().required("Описание проекта обязательно"),
    }),
    Yup.object({
      goal: Yup.number()
        .positive("Цель сбора должна быть больше 0")
        .required("Цель сбора обязательна"),
      currency: Yup.string().required("Выберите валюту"),
    }),
  ];

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleNext = async (
    validateForm: () => Promise<FormikErrors<ProjectForm>>,
    setTouched: (
      fields: { [field: string]: boolean },
      shouldValidate?: boolean,
    ) => Promise<void | FormikErrors<ProjectForm>>,
  ) => {
    const errors = await validateForm();

    if (Object.keys(errors).length === 0) {
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      const touchedFields = Object.keys(errors).reduce(
        (acc, field) => {
          acc[field] = true;
          return acc;
        },
        {} as { [field: string]: boolean },
      );

      setTouched(touchedFields);
    }
  };

  const handleSubmit = async (values: typeof initialValues) => {
    sendForm(values).then(() => {
      setIsSuccess(true);
      const interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev === 1) {
            clearInterval(interval);
          }
          return prev - 1;
        });
      }, 1000);
    });
  };

  useEffect(() => {
    if (isSuccess && secondsLeft === 0) {
      router.push("/");
    }
  }, [isSuccess, secondsLeft, router]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Paper sx={{ width: "100%", maxWidth: 600, p: 3 }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemas[activeStep]}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ validateForm, setTouched }) => (
          <FormFormik>
            <Box sx={{ width: "100%" }}>
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => (
                  <Step key={index}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              {activeStep === steps.length ? (
                <Box
                  sx={{
                    mt: 7,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  {isSuccess ? (
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      Проект успешно создан! Перенаправление через {secondsLeft}{" "}
                      секунд...
                    </Typography>
                  ) : (
                    <>
                      <Typography sx={{ mt: 2, mb: 1 }}>
                        Все шаги завершены! Нажмите «Создать проект».
                      </Typography>
                      <Button type="submit">Создать проект</Button>
                    </>
                  )}
                </Box>
              ) : (
                <>
                  <Box
                    sx={{
                      mt: 7,
                      display: "flex",
                      flexDirection: "column",
                      gap: 5,
                    }}
                  >
                    {activeStep === 0 && <Step1 />}
                    {activeStep === 1 && <Step2 />}
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Назад
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button
                      onClick={() => handleNext(validateForm, setTouched)}
                      type="button"
                    >
                      {"Далее"}
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          </FormFormik>
        )}
      </Formik>
    </Paper>
  );
};
