<template>
  <div>
    <Navbar theme="dark" expand="lg" background-color="body-tertiary">
      <Container type="fluid">
        <NavbarBrand href="/">Logo</NavbarBrand>
        <NavbarToggler />
        <NavbarCollapse>
          <NavbarNavList>
            <NavItem>
              <NavLink active aria-current="page" href="/">user</NavLink>
            </NavItem>
            <NavItem>
              <NavLink active aria-current="page" href="/job">job</NavLink>
            </NavItem>
          </NavbarNavList>
        </NavbarCollapse>
      </Container>
    </Navbar>
    <slot></slot>
  </div>
</template>
<script></script>
