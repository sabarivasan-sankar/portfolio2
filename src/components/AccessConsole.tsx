import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { HEADLINES, RESOURCES, ROLES, type Role } from "../lib/access";
import { profile } from "../lib/content";
import { RoleSwitcher } from "./RoleSwitcher";
import { ResourceBlock } from "./ResourceBlock";

export function AccessConsole() {
  const [role, setRole] = useState<Role>("recruiter");
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (reduced) return;

    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current.querySelectorAll("[data-line]"),
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.75, stagger: 0.07, ease: "power3.out" },
        );
      }
      if (bodyRef.current) {
        gsap.fromTo(
          bodyRef.current.querySelectorAll("[data-block]"),
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.03, ease: "power2.out" },
        );
      }
    });

    return () => ctx.revert();
  }, [role, reduced]);

  const activeRole = ROLES.find((r) => r.id === role)!;

  return (
    <div className="mx-auto w-full max-w-[820px] px-6 md:px-8">
      {/* Statement: the page's visual anchor, and the demo itself. */}
      <section className="pt-32 md:pt-44 pb-20">
        <p className="micro mb-8">{profile.role}</p>

        <h1 ref={headlineRef} className="display text-fg mb-14">
          {HEADLINES[role].map((line) => (
            <span key={line} data-line className="block">
              {line}
            </span>
          ))}
        </h1>

        <div className="flex flex-col gap-4">
          <p className="micro">viewing as</p>
          <RoleSwitcher role={role} onChange={setRole} />
          <p className="body-lg max-w-[54ch] mt-2">{activeRole.blurb}</p>
        </div>
      </section>

      <hr className="rule" />

      <p className="lede py-10 max-w-[62ch]">
        This page is an access-control system. Everything below is re-scoped for the
        role you assume, and two resources stay denied no matter who is asking.
      </p>

      <hr className="rule" />

      <div ref={bodyRef} className="divide-y divide-line">
        {RESOURCES.map((resource) => (
          <div key={resource.id} data-block id={resource.id} className="py-16 md:py-20 scroll-mt-24">
            <ResourceBlock resource={resource} role={role} />
          </div>
        ))}
      </div>
    </div>
  );
}
