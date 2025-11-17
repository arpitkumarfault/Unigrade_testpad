"use client";
import React, { InputHTMLAttributes } from "react";

interface FieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  error?: string | false;
  help?: string;
  icon?: string;
}

export function Field({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  help,
  icon,
  type = "text",
  placeholder,
  autoFocus,
  autoComplete,
  disabled,
  ...rest
}: FieldProps) {
  return (
    <div style={{ display: "grid", gap: 6, width: "100%" }}>
      <label
        htmlFor={name}
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: error ? "var(--color-danger)" : "var(--color-text)",
          transition: "color 0.2s ease",
        }}
      >
        {label}
      </label>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: icon ? 10 : 0,
          background: "var(--color-bg)",
          color: "var(--color-text)",
          border: `1px solid ${error ? "var(--color-danger)" : "var(--color-border)"}`,
          borderRadius: 8,
          padding: "0.625rem 0.875rem",
          transition: "border-color 0.2s ease",
        }}
      >
        {icon && <span style={{ fontSize: 18, flexShrink: 0 }}>{icon}</span>}
        <input
          {...rest}
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : help ? `${name}-help` : undefined}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "var(--color-text)",
            fontSize: 15,
            width: "100%",
            minWidth: 0,
          }}
        />
      </div>
      {help && !error && (
        <small
          id={`${name}-help`}
          style={{
            color: "var(--color-text-muted)",
            fontSize: 12,
            lineHeight: 1.4,
          }}
        >
          {help}
        </small>
      )}
      {error && (
        <small
          id={`${name}-error`}
          role="alert"
          style={{
            color: "var(--color-danger)",
            fontSize: 12,
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          ⚠️ {error}
        </small>
      )}
    </div>
  );
}
